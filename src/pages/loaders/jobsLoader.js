import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";

export default async function jobsLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`/companies/${company_id}/jobs`);
    const departmentFields = await httpClient.get(`/fields?form_name=job&company_id=${company_id}`);

    return defer({jobs: response.data, jobsFields: departmentFields.data});
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
