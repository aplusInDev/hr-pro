import React from 'react';


export default function DragDropContainer({
  handleFileChange, handleFileUpload,
  error, message, show
}) {
  return (
    <div className="drag-drop-container">
        <label>
          <input type="file" title='attendance file' onChange={handleFileChange} />
        </label>
        {error ? <p className="error">{error}</p> : <p>{message}</p>}
        {show && (
          <button className="btn" onClick={handleFileUpload}>
            Upload
          </button>
        )}
      </div>
  );
}
