import React, { useState } from 'react';
import { AbsencesTable } from '../components';
import '../assets/css/Employees.css';
import { useLoaderData } from 'react-router-dom';
import '../assets/css/Absences.css';

import httpClient from '../services/httpClient';
import { excelFileReader } from '../utils/excelUtils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { handleDownload } from '../helpers/excelHelpers';


const EmployeeAbsences = () => {
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearsSet.add(i.toString());
  }

  const { absences, absencesFile } = useLoaderData();
  const [year, setYear] = useState(currentYear);
  const [responseFile, setResponseFile] = useState(absencesFile);
  const [error, setError] = useState(null);
  const [absencesList, setAbsencesList] = useState(absences);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!year) {
      alert('Please select the year.');
      return;
    }

    try {
      const employeeId = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
      // const responseFile = await httpClient.get(`/employees/cd736ecb-9aff-400f-a21c-af244ced2114/absences_sheet?year=2024`, {
      const responseFile = await httpClient.get(`/employees/${employeeId}/absences_sheet?year=${year}`, {
        responseType: 'blob',
      });
      const responseBlob = new Blob([responseFile.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
      const jsonData = await excelFileReader(responseBlob);
      if(jsonData.length === 0) {
        setError('No absences data found for the selected year.');
        setYear(currentYear);
        setTimeout(() => {
          setError(null);
        }, 5*1000);
        return;
      }
      setAbsencesList(jsonData);
      setResponseFile(responseFile);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAbsencesList(null);
      setResponseFile(null);
      setError('Error fetching data. Please try again later.');
    }
  };

  return (
    <main className="employees-container absences-container">
      {error && <p className="error">{error}</p>}
      <form className='calendar-form'
        onSubmit={handleSubmit}
      >
        <label htmlFor="year">Year:</label>
        <select className='main-item' id="year" name="year" value={year} onChange={handleYearChange} required>
          <option value="">-- Select Year --</option>
          {[...yearsSet].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit" className='submit-btn new-btn'>Submit</button>
        <button
          type='button'
          className='submit-btn new-btn'
          onClick={() => {
            const fileName = `absences_${year}.xlsx`;
            handleDownload(responseFile, fileName);;
            }}
        >
          download <Icon icon="akar-icons:download" />
        </button>
      </form>
      <AbsencesTable data={absencesList} />
    </main>
  );
};

export default EmployeeAbsences;

const yearsSet = new Set();
const currentYear = new Date().getFullYear();
