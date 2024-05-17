import React from 'react';

export default function ExcelTable(data) {
  if (data) {
    data = data.data;
    if (data.length < 1) {
      return null;
    }
    return(
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return null;
}
