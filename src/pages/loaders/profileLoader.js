import httpClient from '../../services/httpClient';
import { redirect } from 'react-router-dom';

export default async function profileLoader() {
  try {
    const response = await httpClient.get('http://localhost:5000/api/v1/profile');
    return response.data;
  } catch (err) {
    console.log('erro: ', err);
    if (err.response.status === 401 || err.response.status === 403) {
      return redirect('/login');
    }
    return null;
  }
}
