import React from 'react';

export default function ExcelTable(data) {
  if (data) {
    data = data.data;
    if (data.length < 1) {
      return null;
    }
    return(
      <table
        onClick={(e) => e.stopPropagation()}
      >
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
              {Object.keys(row).map((key, index) => (
                <td key={index}>
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return null;
}
