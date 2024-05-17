import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Attendance.css';
import * as XLSX from 'xlsx';
import { excelDateToFormattedString, excelTimeToFormatedString } from '../utils/excelUtils';
import { ExcelTable } from '../components';

const initialP = 'Drag and drop an excel file here';

const Attendance = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(initialP);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    setMessage('Drop the excel file here');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dropppedFile = event.dataTransfer.files[0];
    // check if the uploaded file is excel file to continue or not
    if (dropppedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setShow(false);
      setFile(null);
      setError('Invalid file type. Please upload an excel file');
      setTimeout(() => {
        setMessage(initialP);
        setError(null)
      }, 2000);
      return;
    }
    setError(null);
    setShow(true);
    setMessage(`Click upload to upload ${dropppedFile.name} file`);
    setFile(dropppedFile); // Set the file to state

    // read the excel file
    const reader = new FileReader();
    reader.readAsArrayBuffer(dropppedFile);
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach(row => {
        for (let key in row) {
          // check if the value is a boolean to convert it to string
          if (typeof row[key] === 'boolean') {
            row[key] = row[key].toString();
          }
          if (typeof row[key] === 'number' && row[key] > 0 && row[key] < 1) {
            row[key] = excelTimeToFormatedString(row[key]);
          } else if (typeof row[key] === 'number' && row[key] > 0) {
            // Assuming row[key] is the Excel date serial number
            row[key] = excelDateToFormattedString(row[key]);
          }
        }
      });
      setData(jsonData);
      setError(null);
    };
    reader.onerror = (error) => {
      setError(error.message);
    };
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('File uploaded successfully');
        setTimeout(() => setMessage(initialP), 5000);
        console.log('File data:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div
      className="attendance"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className='drag-drop-container'
      >
        <input type="file" onChange={handleFileChange} />
        {
          error ? (<p className='error'>{error}</p>) : (<p>{message}</p>)
        }
        {
          show && (
            <button
              className='btn'
              onClick={handleFileUpload}
            >
              Upload
            </button>
          )
        }
      </div>
      <div>
        {
          data && <ExcelTable data={data} />
        }
      </div>
    </div>
  );
};

export default Attendance;
