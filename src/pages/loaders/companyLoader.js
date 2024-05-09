import httpClient from '../../services/httpClient';

export default async function companyLoader() {
  try {
    const response = await httpClient.get('/company');
    return response.data;
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
