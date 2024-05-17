import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Attendance.css';
import { excelFileReader } from '../utils/excelUtils';
import { ExcelTable } from '../components';
import { handleDownload } from '../helpers/excelHelpers';

const initialP = 'Drag and drop an Excel file here';

const Attendance = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(initialP);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setMessage('Drop the Excel file here');
    // setTimeout(() => setMessage(initialP), 2000);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setShow(false);
      setFile(null);
      setError('Invalid file type. Please upload an Excel file.');
      setTimeout(() => {
        setMessage(initialP);
        setError(null);
      }, 2000);
      return;
    }
    
    setError(null);
    setShow(true);
    setMessage(`Click "Upload" to upload ${droppedFile.name}.`);
    setFile(droppedFile);
    
    try {
      const jsonData = await excelFileReader(droppedFile);
      setData(jsonData);
      console.log("jsonData: ", jsonData);
    } catch (err) {
      setError("Warrning: Unexpected error when trying to display the file content (",
      err.message, ").");
      setTimeout(() => {
        setMessage(initialP);
        setError(null);
      }, 2000);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const responseFile = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // instructs axios to handle the response as a Blob
        });
        handleDownload(responseFile);
        setMessage('File uploaded successfully.');
        setTimeout(() => setMessage(initialP), 5000);
        try {
          const responseBlob = new Blob([responseFile.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          const jsonData = await excelFileReader(responseBlob);
          setData(jsonData);
          console.log("jsonData: ", jsonData);
        } catch (err) {
          setError("Warrning: Unexpected error when trying to display the file content (",
          err.message, ").");
          setTimeout(() => {
            setMessage(initialP);
            setError(null);
          }, 2000);
          console.log(err);
        }
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }
  };

  return (
    <div className="attendance" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="drag-drop-container">
        <input type="file" onChange={handleFileChange} />
        {error ? <p className="error">{error}</p> : <p>{message}</p>}
        {show && (
          <button className="btn" onClick={handleFileUpload}>
            Upload
          </button>
        )}
      </div>
      <div>{data && <ExcelTable data={data} />}</div>
    </div>
  );
};

export default Attendance;
