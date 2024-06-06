import React from 'react';

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
            <tr key={index}>
              <td>{row.n_days}</td>
              <td>{row.from}</td>
              <td>{row.to}</td>
              <td>
                <textarea
                  rows='2'
                  cols='30'
                  defaultValue={row.reason}
                  readOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return null;
}
