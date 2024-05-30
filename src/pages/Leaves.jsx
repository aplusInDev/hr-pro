import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';
import '../assets/css/EmployeeLeaves.css';
import httpClient from '../services/httpClient';

export default function Leaves() {
  const leaves = useLoaderData();

  async function approveLeave(id) {
    try {
      const response = await httpClient.put(`/leaves/${id}`, { status: "approved" });
      console.log(response.data);
    } catch (err) {
      console.log("erro: ", err);
    }
  }

  async function rejectLeave(id) {
    try {
      const response = await httpClient.put(`/leaves/${id}`, { status: "rejected" });
      console.log(response.data);
    } catch (err) {
      console.log("erro: ", err);
    }
  }

  return (
    <>
      <section className="employee-leaves">
        <ul>
          {leaves.map(leave => 
            <li key={leave.id}>
              <div className="main-info">
                <p>
                  ({leave.status})
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
                  onClick={() => approveLeave(leave.id)}
                  />
                  <Btn
                  text="reject"
                  onClick={() => rejectLeave(leave.id)}
                  />
                </div>)}
              </div>
            </li>
          )}
        </ul>
      </section>
    </>
  )
}
