import httpClient from "../../services/httpClient";


export default async function leavesLoader() {
  const company_id = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

  try {
    const response = await httpClient.get(`/leaves?company_id=${company_id}&year=2024`);
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("erro: ", err);
    return null;
  }
}
