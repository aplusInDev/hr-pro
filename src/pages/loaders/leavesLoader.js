import httpClient from "../../services/httpClient";


export default async function leavesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;

  try {
    let url;
    if(role === "employee") {
      url = `/employees/${employee_id}/leaves`;
    } else {
      url = `/leaves?company_id=${company_id}&year=2024`;
    }
    const response = await httpClient.get(url);
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
