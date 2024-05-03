import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

export default async function loginLoader2() {
  if (Cookies.get('session_id')) {
    return redirect('/profile');
  }
  else {
    return null;
  }
}
