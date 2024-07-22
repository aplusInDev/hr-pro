import Cookies from 'js-cookie';
import httpClient from '../../services/httpClient';


export default async function action({ request }) {
  const formData = await request.formData();
  const password = formData.get('password');
  const new_password = formData.get('new_password');
  const confirm_password = formData.get('confirm_password');


  if (new_password !== confirm_password) {
    return { warning: 'New password and confirm password do not match' };
  }

  if (new_password === password) {
    return { warning: 'New password must be different from the old password' };
  }

  try {
    const response = await httpClient.post('/update_password',
      formData,
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  } finally {
    Cookies.remove('session_id');
    localStorage.removeItem('currentUser');
  }
}