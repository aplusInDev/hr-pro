import httpClient from "../../services/httpClient";


export default async function trainingsLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;
  const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;

  let url;
  if(role === "employee") {
    url = `employees/${employee_id}/trainings`;
  } else {
    url = `companies/${company_id}/trainings`;
  }

  try {
    const response = await httpClient.get(url);
    const employeesNames = await httpClient.get(`companies/${company_id}/employees_names`);

    return {trainings: response.data, employees: employeesNames.data};
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
