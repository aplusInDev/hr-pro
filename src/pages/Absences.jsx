import React, { useState } from 'react';
import { AbsencesTable } from '../components';
import '../assets/css/Employees.css';
import { useLoaderData } from 'react-router-dom';
import { excelFileReader } from '../utils/excelUtils';
import httpClient from '../services/httpClient';
import { Icon } from '@iconify/react';
import '../assets/css/Absences.css';

export default function Employees() {
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;
  const { employees, absences } = useLoaderData();
  const [activeId, setActiveId] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  async function handleClick(e) {
    setShow(true);
    if (activeId === e.target.id) {
      console.log("one");
      return;
    } else {
      console.log("two");
      setActiveId(e.target.id);
      await fetchEmployeeAbsences(e.target.id);
    }
  }

  async function fetchEmployeeAbsences (employeeId) {
    try {
      const responseFile = await httpClient.get(`/employees/${employeeId}/absences_sheet`, {
        responseType: 'blob',
      });
      const responseBlob = new Blob([responseFile.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const jsonData = await excelFileReader(responseBlob);
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
      {/* <Filter />
      <Outlet /> */}
      <section className="employees-container absences-container">
        {error && <h2 className='error'>{error}</h2>}
        {role === 'employee'? (
            <AbsencesTable data={absences} />
          ):(
          <ul>
          {employees.map(employee =>
            <li
              key={employee.id}
              className={show && employee.id === activeId ? 'show' : 'hide'}
            >
              <div className='absent-info'>
                <div className='employee-short-info'>
                  <span
                    id={employee.id}
                    onClick={(e) => {
                      if(employee.absences === 0) return;
                      handleClick(e);
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
                      {employee.absences_total_days} day in {employee.absences} absences
                    </span>
                  )}
                  {employee.absences > 0 && (employee.id !== activeId || !show) && (
                    <>
                      <span className='justified-absences'>
                        {employee.justified_absences_days} day in {employee.justified_absences} justified absences
                      </span>
                      <span className='unjustified-absences'>
                        {employee.unjustified_absences_days} day in {employee.unjustified_absences} justified absences
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
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('download');
                    }}
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
        )}
      </section>
    </>
  );
}
