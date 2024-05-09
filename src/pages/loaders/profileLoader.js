import httpClient from '../../services/httpClient';
import { redirect } from 'react-router-dom';

const currentUser = localStorage.getItem('currentUser');
const company_id = currentUser?.company_id
const employee_id = currentUser?.employee_id

export default async function profileLoader() {
  try {
    const response = await httpClient.get(`/employees/${employee_id}`);
    return response.data;
  } catch (err) {
    console.log('erro: ', err);
    if (err.response.status === 401 || err.response.status === 403) {
      return redirect('/login');
    }
    return null;
  }
}
