import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Attendance.css';

const initialP = 'Drag and drop an excel file here';

const Attendance = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(initialP);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    setMessage('Drop the excel file here');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // check if the uploaded file is excel file to continue or not
    if (event.dataTransfer.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
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
    setMessage(`Click upload to upload ${event.dataTransfer.files[0].name} file`);
    setFile(event.dataTransfer.files[0]); // Set the file to state
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
        {/* display droped table here */}
      </div>
    </div>
  );
};

export default Attendance;
