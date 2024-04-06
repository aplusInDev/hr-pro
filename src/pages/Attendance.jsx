import React from "react";
import "../assets/css/Attendance.css";
import { FaCalendar } from "react-icons/fa6";

const Attendance = ({ data }) => {
  return (
    <div>
      <div>
        <button className="buttomStart">Start</button>
        <button className="buttomEnd">End</button>
        <button className="buttomDate">dd/mm/yyyy</button>
        <button className="buttomCalender">
          <FaCalendar />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="id">ID</th>
            <th>Employee</th>
            <th>Start Timing</th>
            <th>Completion Timing</th>
            <th>Total</th>
            <th className="Extra">Extra Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row["id"]}</td>
              <td>{row["emp name"]}</td>
              <td>{row["hh : mm : sss"]}</td>
              <td>{row["hh : mm : ss"]}</td>
              <td>{row["total"]}</td>
              <td>{row["Extra time"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
