import React, { useState } from 'react';
import { AbsencesTable } from '../components';
import '../assets/css/Employees.css';
import { useLoaderData } from 'react-router-dom';
import httpClient from '../services/httpClient';
import { Icon } from '@iconify/react';
import '../assets/css/Absences.css';
import { handleDownload } from '../helpers/excelHelpers';

export default function Absences() {
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearsSet.add(i.toString());
  }
  const { employees } = useLoaderData();
  const [activeId, setActiveId] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(currentYear);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setActiveId(null);
  };

  async function handleYearSubmit(e) {
    e.preventDefault();
    console.log(year);
  }

  async function handleClick(id) {
    setShow(true);
    if (activeId === id) {
      return;
    } else {
      setActiveId(id);
      await fetchEmployeeAbsences(id);
    }
  }

  async function handleDownloadClick(employee) {
    try {
      const responseFile = await httpClient.get(`/employees/${employee.id}/absences_sheet?year=${year}`, {
        responseType: 'blob',
      });
      const fileName = `${employee.first_name}_${employee.last_name}-${year}_absences.xlsx`;
      handleDownload(responseFile, fileName);
    }
    catch(err) {
      console.log(err);
    }
  }

  async function fetchEmployeeAbsences (employeeId) {
    try {
      const response = await httpClient.get(`/employees/${employeeId}/absences?year=${year}`);
      const jsonData = response.data;
      if(jsonData.length !== 0) {
        setData(jsonData);
      } else {
        setData(null);
        console.log("no data");
      }
      setError(null);
    } catch(err) {
      setData(null);
      console.log(err)
    }
  }

  return (
    <>
      <section className="employees-container absences-container">
        {error && <h2 className='error'>{error}</h2>}
        <form className='calendar-form'
          onSubmit={handleYearSubmit}
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
      </form>
        <ul>
          {employees.map(employee =>
            <li
              key={employee.id}
              className={"main-item " + (
                show && employee.id === activeId ? 'active' : 'hide'
              )}
            >
              <div className='absent-info'>
                <div className='employee-short-info'>
                  <span
                    onClick={() => {
                      if(employee.absences === 0) return;
                      handleClick(employee.id);
                    }}
                    >
                    {employee.first_name} {employee.last_name}
                  </span>
                  <span>
                    {employee.position_info.job_title}
                  </span>
                </div>
                <div className="absences-short-info">
                  {(employee.id !== activeId || !show) && (
                    <span className='sum_absences'>
                      {employee.absences_total_days} day in {employee.absences} absence(s)
                    </span>
                  )}
                  {employee.absences > 0 && (employee.id !== activeId || !show) && (
                    <>
                      <span className='justified-absences'>
                        {employee.justified_absences_days} day in {employee.justified_absences} justified absence(s)
                      </span>
                      <span className='unjustified-absences'>
                        {employee.unjustified_absences_days} day in {employee.unjustified_absences} unjustified absence(s)
                      </span>
                    </>
                  )}
                </div>
              </div>
              {employee.id === activeId && data ? (
                <div className='absence-info'>
                  <span
                    className='close'
                    onClick={() => setShow(false)}
                  >
                    <Icon icon="material-symbols-light:close" />
                  </span>
                  <AbsencesTable data={data} />
                  <button
                    type='button'
                    className='submit-btn'
                    onClick={() => {handleDownloadClick(employee)}}
                  >
                    Download
                    <Icon icon="akar-icons:download" />
                  </button>
                </div>
                ) : (
                  null
              )}
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

const yearsSet = new Set();
const currentYear = new Date().getFullYear();
