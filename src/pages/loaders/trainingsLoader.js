import httpClient from "../../services/httpClient";


export default async function trainingsLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`companies/${company_id}/trainings`);

    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
