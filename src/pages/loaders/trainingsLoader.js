import httpClient from "../../services/httpClient";


export default async function trainingsLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`companies/${company_id}/trainings`);
    const employeesNames = await httpClient.get(`companies/${company_id}/employees_names`);

    return {trainings: response.data, employees: employeesNames.data};
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
