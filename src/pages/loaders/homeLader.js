import httpClient from '../../services/httpClient';
import { redirect } from 'react-router-dom';

export default async function homeLoader() {
  try {
    await httpClient.get('/profile');
    return true;
  } catch (err) {
    console.log('erro: ', err);
    if (err.response.status === 401 || err.response.status === 403) {
      return redirect('/login');
    }
    return redirect("/");
  }
}
