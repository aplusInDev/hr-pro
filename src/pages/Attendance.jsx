import React, { useState } from 'react';
import '../assets/css/Attendance.css';
import { excelFileReader } from '../utils/excelUtils';
import { ExcelTable } from '../components';
import httpClient from '../services/httpClient';


const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;
const initialP = 'Drag and drop an Excel file here';

const Attendance = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(initialP);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedDate) {
      try {
        const responseFile = await httpClient.get(`/companies/${company_id}/attendance?date=${selectedDate}`, {
          responseType: 'blob',
        });
        const responseBlob = new Blob([responseFile.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const jsonData = await excelFileReader(responseBlob);
        setData(jsonData);
      } catch (err) {
        console.error('Error downloading file:', err);
      }
    } else {
      console.log("Please select a valid date");
    }
  }
  

  const handleDragOver = (event) => {
    event.preventDefault();
    setMessage('Drop the Excel file here');
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
        const response = await httpClient.post(`/companies/${company_id}/attendance`,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setMessage('File uploaded successfully.');
        setTimeout(() => setMessage(initialP), 5000);
        console.log(response.data);
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
      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="selectedDate">Select Date:</label>
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={handleChange}
        />
        <button
          type="submit"
          className='submit-btn'
        >
          Submit
        </button>
      </form>
      <div>{data && <ExcelTable data={data} />}</div>
    </div>
  );
};

export default Attendance;
