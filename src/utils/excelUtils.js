import * as XLSX from 'xlsx';

export function excelTimeToFormatedString(excelTime) {
  // Convert Excel time to JavaScript Date object
  const secondsInDay = 86400;
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const excelTimeInMilliseconds = excelTime * secondsInDay * 1000;
  const jsDate = new Date(excelEpoch.getTime() + excelTimeInMilliseconds);

  // Extract hours, minutes, and seconds
  const hours = jsDate.getUTCHours();
  const minutes = jsDate.getUTCMinutes();
  const seconds = jsDate.getUTCSeconds();

  // Format the time string
  const timeString = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':') + ' ' + (hours >= 12 ? 'PM' : 'AM');

  return timeString;
}

export function excelDateToFormattedString(serial) {
  // Excel date serial numbers start from 1st January 1900
  const excelEpoch = new Date(1900, 0, -1);
  const excelEpochAsJS = excelEpoch.getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const excelDateAsJS = new Date(excelEpochAsJS + serial * millisecondsPerDay);

  // Extract day, month, and year
  const day = excelDateAsJS.getDate();
  const month = excelDateAsJS.getMonth() + 1; // Months are zero-based
  const year = excelDateAsJS.getFullYear();

  // Format as dd-mm-yyyy
  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

  return formattedDate;
}

export async function excelFileReader(dropppedFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
      reader.readAsArrayBuffer(dropppedFile);
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
        jsonData.forEach(row => {
          for (let key in row) {
            // check if the value is a boolean to convert it to string
            if (typeof row[key] === 'boolean') {
              row[key] = row[key].toString();
            }
            if (typeof row[key] === 'number' && row[key] > 0 && row[key] < 1) {
              row[key] = excelTimeToFormatedString(row[key]);
            } else if (typeof row[key] === 'number' && row[key] > 0) {
              // Assuming row[key] is the Excel date serial number
              row[key] = excelDateToFormattedString(row[key]);
            }
          }
        });
        resolve(jsonData);
      };
      reader.onerror = (error) => {
        console.log("error: ", error)
        reject(error);
      };
  });
}
