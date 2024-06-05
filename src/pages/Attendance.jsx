import React, { useState } from 'react';
import '../assets/css/Attendance.css';
import { excelFileReader } from '../utils/excelUtils';
import { ExcelTable } from '../components';
import httpClient from '../services/httpClient';
import { Icon } from '@iconify/react';
import { handleDownload } from '../helpers/excelHelpers';
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
  const [selectedDate, setSelectedDate] = useState('');
  const [dateStatus, setDateStatus] = useState('idle'); // idle, changing, submitted
  const [dateError, setDateError] = useState(null);
  const [responseFile, setResponseFile] = useState(null);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
    if (dateStatus !== 'changing') setDateStatus('changing');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(company_id);
    if (selectedDate) {
      setDateStatus('submitted');
      try {
        const responseFile = await httpClient.get(`/companies/${company_id}/attendance?date=${selectedDate}`, {
          responseType: 'blob',
        });
        const responseBlob = new Blob([responseFile.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const jsonData = await excelFileReader(responseBlob);
        setData(jsonData);
        setDateError(null);
        setResponseFile(responseFile);
      } catch (err) {
        // check if error status code is 404
        setDateStatus('idle');
        setData(null);
        setResponseFile(null);
        if (err.response.status === 404) {
          setDateError("No attendance data found for the selected date");
        } else {
          setDateError("Request failed. Please try again later.");
        }
      }
    } else {
      setError("Please select a valid date");
    }
  }
  

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
      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="selectedDate">
          <div>select attendance date</div>
        </label>
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={handleChange}
        />
        {
          dateStatus === 'submitted' && (
            <button
              type='button'
              className='submit-btn'
              onClick={() => {
                const fileName = `attendance-${selectedDate}.xlsx`;
                handleDownload(responseFile, fileName);;
              }}
            >
              download <Icon icon="akar-icons:download" />
            </button>
          )
        }
        {
          dateStatus === 'changing' && (
            <button
              type="submit"
              className='submit-btn'
            >
              Submit
            </button>
          )
        }
        {
          dateError && (
            <p>{dateError}</p>
          )
        }
      </form>
      <div>{data && <ExcelTable data={data} />}</div>
    </div>
  );
};

export default Attendance;
