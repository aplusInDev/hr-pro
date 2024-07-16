import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";

export default async function absencesLoader() {
  const companyId = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const currentYear = new Date().getFullYear();

  try {
    const response = await httpClient.get(`/companies/${companyId}/employees_absences?year=${currentYear}`);

    return defer({initialEmployees: response.data});
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
