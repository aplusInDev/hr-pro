import React, { useState } from 'react';
import { Filter, ExcelTable } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { excelFileReader } from '../utils/excelUtils';
import httpClient from '../services/httpClient';
import { Icon } from '@iconify/react';

export default function Employees() {
  const { employees } = useLoaderData();
  const [activeId, setActiveId] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick(e) {
    if (activeId === e.target.id) {
      setActiveId(null);
      setData(null);
    } else {
      // setActive(e.target.id);
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
      if(jsonData.length === 0) {
        setData(null);
        setActiveId(null);
      } else {
        setActiveId(employeeId);
        setData(jsonData);
      }
      setError(null);
    } catch(err) {
      setData(null);
      setActiveId(null);
      console.log(err)
    }
  }

  return (
    <>
      <div className="new-employee">
        <Link to='add-employee'>
          <Btn text="Add Employee" />
        </Link>
      </div>
      <Filter />
      <Outlet />
      <section className="employees-container">
        {error && <h2 className='error'>{error}</h2>}
        <ul>
          {
            employees.map(employee =>
              <li
                id={employee.id}
                key={employee.id}
                onClick={handleClick}
                className={employee.id === activeId ? 'active' : ''}
              >
                {
                  employee.id === activeId && data ? (
                    <>
                      <span
                        onClick={() => setActiveId(null)}
                      >--
                      </span>
                      <ExcelTable data={data} />
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
                    </>
                  ) : (
                    <>
                      <span>{employee.first_name}</span>
                      <span>{employee.last_name}</span>
                      <div>{employee.job_title}</div>
                    </>
                  )
                }
              </li>
            )
          }
        </ul>
      </section>
    </>
  );
}
