import React, { useState } from 'react';
import httpClient from '../../services/httpClient';


export default function DragDropContainer({
  show, setShow, message, setMessage, file, setFile,
}) {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const initialP = 'Drag and drop an Excel file here';
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        await httpClient.post(`/companies/${company_id}/attendance_async`,
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
    <div className="drag-drop-container">
        <label>
          <input type="file" title='attendance file' onChange={handleFileChange} />
        </label>
        {error ? <p className="error">{error}</p> : <p>{message}</p>}
        {show && (
          <button className="btn new-btn" onClick={handleFileUpload}>
            Upload
          </button>
        )}
      </div>
  );
}
