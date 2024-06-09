import React, { useState } from 'react';
import httpClient from '../../services/httpClient';
import { excelFileReader } from '../../utils/excelUtils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { handleDownload } from '../../helpers/excelHelpers';


const CalendarForm = ({ setData, }) => {
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearsSet.add(i.toString());
  }

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [responseFile, setResponseFile] = useState(null);
  const [error, setError] = useState(null);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setResponseFile(null);
    setData(null);
  };
    
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setResponseFile(null);
    setData(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!month || !year) {
      alert('Please select both month and year.');
      return;
    }

    try {
      const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
      const responseFile = await httpClient.get(`/employees/${employee_id}/attendance?month=${month}&year=${year}`, {
        responseType: 'blob',
      });
      const responseBlob = new Blob([responseFile.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
      const jsonData = await excelFileReader(responseBlob);
      if(jsonData.length === 0) {
        setError('No attendance data found for the selected month and year.');
        setTimeout(() => {
          setError(null);
        }, 5*1000);
        return;
      }
      setData(jsonData);
      setResponseFile(responseFile);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
      setResponseFile(null);
      setError('Error fetching data. Please try again later.');
    }
  };

  return (
    <>
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleSubmit}>
      <label htmlFor="month">Month:</label>
      <select className='main-item' id="month" name="month" value={month} onChange={handleMonthChange} required>
        {months.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor="year">Year:</label>
      <select className='main-item' id="year" name="year" value={year} onChange={handleYearChange} required>
        <option value="">-- Select Year --</option>
        {[...yearsSet].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {responseFile? (
        <button
          type='button'
          className='submit-btn'
          onClick={() => {
            const fileName = `attendance${month}_${year}.xlsx`;
            handleDownload(responseFile, fileName);;
            }}
        >
          download <Icon icon="akar-icons:download" />
        </button>
        ): (
        <button type="submit" className='submit-btn new-btn'>Submit</button>
      )}
    </form>
    </>
  );
};

export default CalendarForm;

const yearsSet = new Set();
const currentYear = new Date().getFullYear();
const months = [
  { value: '', label: '-- Select Month --' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];
