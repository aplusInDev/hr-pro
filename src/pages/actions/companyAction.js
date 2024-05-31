import httpClient from "../../services/httpClient";

export default async function companyAction({ request }) {
  const formData = await request.formData();
  const companyId = JSON.parse(localStorage.getItem('currentUser'))?.company_id;

  try {
    const data = await httpClient.put(`/companies/${companyId}`,
      formData,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
