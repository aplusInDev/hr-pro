import httpClient from "../../services/httpClient";

export default async function departmentLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const departmentsNames = await httpClient.get(`/companies/${company_id}/departments_names`);
    const jobsTitles = await httpClient.get(`/companies/${company_id}/jobs_titles`);

    return {departments: departmentsNames.data, jobs: jobsTitles.data};
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
