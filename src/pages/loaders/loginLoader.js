import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import httpClient from '../../services/httpClient';

export default async function loginLoader2() {
  if (Cookies.get('session_id')) {
    try {
      await httpClient.get('http://localhost:5000/api/v1/profile');
      // return redirect('/profile');
      return redirect('/home');
    } catch(err) {
      // remove session_id from the cookie
      Cookies.remove('session_id');
      return null;
    }
  }
  else {
    return null;
  }
}
