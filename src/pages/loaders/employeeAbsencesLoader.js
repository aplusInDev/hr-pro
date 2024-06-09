import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";
import { excelFileReader } from "../../utils/excelUtils";

export default async function employeeAbsencesLoader() {
  const employeeId = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
  const currentYear = new Date().getFullYear();

  try {
    // const responseFile = await httpClient.get(`/employees/cd736ecb-9aff-400f-a21c-af244ced2114/absences_sheet?year=2024`, {
    const responseFile = await httpClient.get(`/employees/${employeeId}/absences_sheet?year=${currentYear}`, {
      responseType: 'blob',
    });
    const responseBlob = new Blob([responseFile.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
    const jsonData = await excelFileReader(responseBlob);
    return defer({absences: jsonData, absencesFile: responseFile})
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
