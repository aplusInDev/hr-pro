import httpClient from "../../services/httpClient";


export default async function leavesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;

  try {
    let url;
    const currentYear = new Date().getFullYear();
    if(role === "employee") {
      url = `/employees/${employee_id}/leaves?year=${currentYear}`;
    } else {
      url = `/leaves?company_id=${company_id}&year=${currentYear}`;
    }
    const response = await httpClient.get(url);

    return response.data;
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
