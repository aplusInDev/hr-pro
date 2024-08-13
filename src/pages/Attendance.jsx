import React, { useState } from 'react';
import '../assets/css/Attendance.css';
import { excelFileReader } from '../utils/excelUtils';
import { ExcelTable, AttendanceForm, CalendarForm } from '../components';
import { DragDropContainer } from '../components/ui';


const Attendance = () => {
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;
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
  
  return (
    <main className="attendance" onDragOver={handleDragOver} onDrop={handleDrop}>
      {error && <p className="error">{error}</p>}
      {role === "employee"? (
        <CalendarForm 
          setData={setData}
          setError={setError}
        />
        ) : (
          <>
          <DragDropContainer
            message={message}
            setMessage={setMessage}
            show={show}
            setShow={setShow}
            file={file}
            setFile={setFile}
          />
          <div className='or-div'>or</div>
          <AttendanceForm
            setData={setData}
            dateStatus={dateStatus}
            setDateStatus={setDateStatus}
          />
        </>
        )
      }
      <div>{data && <ExcelTable data={data} />}</div>
    </main>
  );
};

export default Attendance;
