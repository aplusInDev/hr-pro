import httpClient from '../../services/httpClient';

export default async function companyLoader() {
  try {
    const response = await httpClient.get('http://localhost:5000/api/v1/company');
    return response.data;
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
