import React, { useState } from 'react';
import { Btn } from './ui';
import { Icon } from '@iconify/react/dist/iconify.js';
import httpClient from '../services/httpClient';

export default function AbsencesTable(data) {
  if (data) {
    data = data.data;
    if (data.length < 1) {
      return null;
    }
    return(
      <table>
        <thead>
          <tr>
            <th>N days</th>
            <th>from</th>
            <th>to</th>
            <th>reason</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <AbsenceRow 
              key={index}
              row={row}
            />
          ))}
        </tbody>
      </table>
    )
  }
  return null;
}


function AbsenceRow({ row }) {
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;
  const [editStatus, setEditStatus] = useState("idle"); // idle, editing, submitting
  const [changedData, setChangedData] = useState("");


  function handleChange(e) {
    setEditStatus("editing");
    setChangedData(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEditStatus("submitting");
    try {
      await httpClient.put(`/absences/${row.id}`, {
        reason: changedData,
      });
    } catch(err) {
      console.log(err);
    } finally {
      setEditStatus("idle");
    }
  }

  return (
    <tr>
      <td>{row.n_days}</td>
      <td>{row.from}</td>
      <td>{row.to}</td>
      <td>
        <textarea
          rows='2'
          cols='30'
          defaultValue={row.reason}
          onChange={handleChange}
          readOnly={editStatus !== "editing"}
        />
        {editStatus === "submitting" && (
          <p>Updating..</p>
        )}
        {editStatus === "idle" && role !== "employee" && (
          <Btn text=""
            onClick={() => setEditStatus("editing")}
          >
            <Icon icon="akar-icons:edit" />
          </Btn>
        )}
        {editStatus === "editing" && (
          <Btn text=""
            onClick={handleSubmit}
          >
            <Icon icon="akar-icons:check" />
          </Btn>
        )}
      </td>
    </tr>
  );
}
