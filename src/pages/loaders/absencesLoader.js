import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";

export default async function absencesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`/companies/${company_id}/employees`);
    const absencesRes = await httpClient.get(`/employees/cd736ecb-9aff-400f-a21c-af244ced2114/absences?year=2024`);

    return defer({employees: response.data, absences: absencesRes.data});
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
