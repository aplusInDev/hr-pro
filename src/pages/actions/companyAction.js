import httpClient from "../../services/httpClient";

export default async function companyAction({ request }) {
  const formData = await request.formData();

  try {
    const data = await httpClient.put('http://localhost:5000/api/v1/company',
      formData,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
