import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';
import '../assets/css/EmployeeLeaves.css';
import httpClient from '../services/httpClient';


export default function Leaves() {
  const initialLeaves = useLoaderData();
  const pendingLeaves = filterLeaves(initialLeaves, "pending");
  const approvedLeaves = filterLeaves(initialLeaves, "approved");
  const [leaves, setLeaves] = useState(pendingLeaves);
  const [updatingLeaveId, setUpdatingLeaveId] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("pending");

  async function updateLeaveStatus(id, status) {
    setUpdatingLeaveId(id);
    setError(null);
    try {
      await httpClient.put(`/leaves/${id}`, { status });
      initialLeaves.find(leave => leave.id === id).status = status;
      setLeaves(filterLeaves(initialLeaves, "approved"));
      setActive("approved");
    } catch (err) {
      console.error("Error updating leave:", err);
      setError("Failed to update leave. Please try again.");
    } finally {
      setUpdatingLeaveId(null);
    }
  }

  return (
    <>
      <section className="employee-leaves">
      <div className="header">
        <Btn text="pending"
          className={active === "pending" ? "active" : ""}
          onClick={() => {
            setLeaves(pendingLeaves);
            setActive("pending");
          }}
        />
        <Btn text="approved"
          className={active === "approved" ? "active" : ""}
          onClick={() => {
            setLeaves(approvedLeaves);
            setActive("approved");
          }}
        />
      </div>
        <ul>
          {leaves.map(leave => (
            <li key={leave.id}>
              <div className="main-info">
                <p>
                  {updatingLeaveId === leave.id && 'Updating...'}
                </p>
                <p>
                  <span>employee</span>
                  <span>{leave.employee}</span>
                </p>
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
                {leave.status === "pending" && (
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
