import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import httpClient from '../../services/httpClient';

export default async function loginLoader() {
  if (Cookies.get('session_id')) {
    try {
      await httpClient.get('/profile');
      // return redirect('/profile');
      return redirect('/home/profile');
    } catch(err) {
      // remove session_id from the cookie
      Cookies.remove('session_id');
      localStorage.clear();
      return null;
    }
  }
  else {
    return null;
  }
}
