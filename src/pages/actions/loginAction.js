import Cookies from 'js-cookie';
import httpClient from '../../services/httpClient';
import { redirect } from 'react-router-dom';


export default async function loginAction({ request }) {
  const formData = await request.formData();


  try {
    const response = await httpClient.post('/login',
      formData,
    );
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return redirect('/home');
  } catch (err) {
    localStorage.removeItem('currentUser');
    Cookies.remove('session_id');
    return err.response.data;
  }
}