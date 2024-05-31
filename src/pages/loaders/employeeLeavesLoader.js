import httpClient from "../../services/httpClient";


export default async function employeeLeavesLoader() {
  const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;

  try {
    const response = await httpClient.get(`/employees/${employee_id}/leaves`);

    return response.data;
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}