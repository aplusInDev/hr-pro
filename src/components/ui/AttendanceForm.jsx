import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import httpClient from '../../services/httpClient';
import { handleDownload } from '../../helpers/excelHelpers';
import { excelFileReader } from '../../utils/excelUtils';

export default function AttendanceForm({
  setData, setError,
  dateStatus, setDateStatus
}) {
  const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;
  const [selectedDate, setSelectedDate] = useState('');
  const [dateError, setDateError] = useState(null);
  const [responseFile, setResponseFile] = useState(null);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
    if (dateStatus !== 'changing') setDateStatus('changing');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
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
            <p className='error'>{dateError}</p>
          )
        }
      </form>
  );
}
