import httpClient from '../../services/httpClient';
import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default async function logoutLoader() {
  try {
    await httpClient.delete('/logout');
    Cookies.remove('session_id');
    localStorage.removeItem('currentUser');
    return redirect('/');
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
