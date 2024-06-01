import httpClient from "../../services/httpClient";


export default async function leavesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;

  try {
    let response;
    if(role === "employee") {
      response = await httpClient.get(`/employees/${employee_id}/leaves`);
    } else {
      response = await httpClient.get(`/leaves?company_id=${company_id}&year=2024`);
    }
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
