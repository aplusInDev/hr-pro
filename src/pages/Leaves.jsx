import React, { useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';
import '../assets/css/EmployeeLeaves.css';
import httpClient from '../services/httpClient';


export default function Leaves() {
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearsSet.add(i.toString());
  }
  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;
  const initialLeaves = useLoaderData();
  const pendingLeaves = filterLeaves(initialLeaves, "pending");
  const approvedLeaves = filterLeaves(initialLeaves, "approved");
  const [leaves, setLeaves] = useState(pendingLeaves);
  const [updatingLeaveId, setUpdatingLeaveId] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("pending");
  const [year, setYear] = useState(currentYear);


  function handleYearChange(e) {
    setYear(e.target.value);
  }

  async function handleSubmitYear(e) {
    e.preventDefault();
    let url;
    if(!year) {
      alert('Please select a year.');
      return;
    }
    if (role === "employee") {
      const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
      url = `/employees/${employee_id}/leaves?year=${year}`;
    } else {
      const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
      url = `/leaves?company_id=${company_id}&year=${year}`;
    }
    try {
      const response = await httpClient.get(url);
      setLeaves(filterLeaves(response.data, active));
    } catch (err) {
      console.error("Error fetching leaves:", err);
      setError("Failed to fetch leaves. Please try again.");
    }
  }

  async function updateLeaveStatus(id, status) {
    setUpdatingLeaveId(id);
    setError(null);
    try {
      await httpClient.put(`/leaves/${id}`, { status });
      initialLeaves.find(leave => leave.id === id).status = status;
      setLeaves(filterLeaves(initialLeaves, "approved"));
      setActive("approved");
    } catch (err) {
      console.log("Error updating leave:", err);
      setError("Failed to update leave. Please try again.");
    } finally {
      setUpdatingLeaveId(null);
    }
  }

  return (
    <>
    <Outlet context={setLeaves} />
    <section className="employee-leaves">
      <div className="header">
      {role === "employee" && (<>
        <div className="new-employee">
          <Link to='request-leave'>
            <Btn text="Request Leave" />
          </Link>
        </div>
      </>)}
        <Btn text="pending"
          className={"new-btn " + (
            active === "pending" ? "active" : "")
          }
          onClick={() => {
            setLeaves(pendingLeaves);
            setActive("pending");
          }}
          />
          <Btn text="approved"
            className={"new-btn " + (
              active === "approved" ? "active" : "")
            }
            onClick={() => {
              setLeaves(approvedLeaves);
              setActive("approved");
            }}
          />
        </div>
      <form className='calendar-form'
        onSubmit={handleSubmitYear}
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
        {leaves.map(leave => (
          <li key={leave.id}
            className="main-item"
          >
            <div className="main-info">
              <p>
                {updatingLeaveId === leave.id && 'Updating...'}
              </p>
              {role !== "employee" && (
                <p>
                  <span>employee</span>
                  <span>{leave.employee}</span>
                </p>
              )}
              <p>
                <span>type</span>
                <span>{leave.leave_type}</span>
              </p>
              <p>
                <span>duration</span>
                <span>{leave.duration}</span>
              </p>
              <p>
                <span>date</span>
                <span>{leave.start_date} -</span>
                <span>{leave.end_date}</span>
              </p>
              {leave.status === "pending" && role !== "employee" && (
                <div className='btns'>
                  <Btn
                    text="accept"
                    className="accept"
                    disabled={updatingLeaveId}
                    onClick={() => {
                      updateLeaveStatus(leave.id, "approved");
                    }}
                  />
                  <Btn
                    text="reject"
                    className="reject"
                    disabled={updatingLeaveId}
                    onClick={() => {
                      updateLeaveStatus(leave.id, "rejected");
                    }}
                  />
                </div>
              )}
              {error && <p className="error">{error}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  </>
  );
}

const filterLeaves = function(leaves, status) {
  return leaves.filter(leave => leave.status === status);
}

const yearsSet = new Set();
const currentYear = new Date().getFullYear();
