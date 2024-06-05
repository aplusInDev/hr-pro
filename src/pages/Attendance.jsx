import React, { useState } from 'react';
import '../assets/css/Attendance.css';
import { excelFileReader } from '../utils/excelUtils';
import { ExcelTable, AttendanceForm } from '../components';
import httpClient from '../services/httpClient';
import { DragDropContainer } from '../components/ui';


const Attendance = () => {
  const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;
  // const role = JSON.parse(localStorage.getItem('currentUser'))?.role;
  const initialP = 'Drag and drop an Excel file here';
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(initialP);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [dateStatus, setDateStatus] = useState('idle'); // idle, changing, submitted
  

  const handleDragOver = (event) => {
    event.preventDefault();
    setMessage('Drop the Excel file here');
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDateStatus('idle');
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
        await httpClient.post(`/companies/${company_id}/attendance`,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setMessage('File uploaded successfully.');
      } catch (err) {
        setError(err.response.data['error']);
      }
    }
    setTimeout(() => {
      setError(null);
      setMessage(initialP);
    }, 3000);
    setShow(false);
  };

  return (
    <div className="attendance" onDragOver={handleDragOver} onDrop={handleDrop}>
      <DragDropContainer 
        handleFileChange={handleFileChange}
        handleFileUpload={handleFileUpload}
        error={error}
        message={message}
        show={show}
      />
      <div className='or-div'>or</div>
      <AttendanceForm
        setData={setData}
        setError={setError}
        dateStatus={dateStatus}
        setDateStatus={setDateStatus}
      />
      <div>{data && <ExcelTable data={data} />}</div>
    </div>
  );
};

export default Attendance;
