import httpClient from '../../services/httpClient';
import { redirect } from 'react-router-dom';

export default async function logoutLoader() {
  try {
    await httpClient.delete('http://localhost:5000/api/v1/logout');
    // removing session_id from cookie
    document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('currentUser');
    return redirect('/');
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
