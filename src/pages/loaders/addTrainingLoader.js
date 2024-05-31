import httpClient from "../../services/httpClient";

export default async function departmentLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const departmentsNames = await httpClient.get(`/companies/${company_id}/departments_names`);
    const jobsTitles = await httpClient.get(`/companies/${company_id}/jobs_titles`);
    const employeesNames = await httpClient.get(`/companies/${company_id}/employees_names`);

    return {
      departments: departmentsNames.data,
      jobs: jobsTitles.data,
      employees: employeesNames.data
    };
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
