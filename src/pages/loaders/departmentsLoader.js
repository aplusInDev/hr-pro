import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";

export default async function departmentLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`/companies/${company_id}/departments`);
    const departmentFields = await httpClient.get(`/fields?form_name=department&company_id=${company_id}`);

    return defer({departments: response.data, departmentsFields: departmentFields.data});
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
