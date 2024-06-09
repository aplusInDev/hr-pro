import { defer } from "react-router-dom";
import httpClient from "../../services/httpClient";

export default async function absencesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`/companies/${company_id}/employees`);

    return defer({employees: response.data});
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
