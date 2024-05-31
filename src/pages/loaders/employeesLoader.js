import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";

export default async function employeesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`/companies/${company_id}/employees`);
    const employeeFields = await httpClient.get(`/fields?form_name=employee&company_id=${company_id}`);

    return defer({employees: response.data, employeeFields: employeeFields.data});
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
