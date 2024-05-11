import httpClient from '../../services/httpClient';
import { defer, redirect } from 'react-router-dom';


export default async function profileLoader() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const company_id = currentUser?.company_id;

  try {
    const employeeFields = await httpClient.get(`/fields?form_name=employee&company_id=${company_id}`);
    return defer({employeeFields: employeeFields.data});
  } catch (err) {
    console.log('erro: ', err);
    return redirect('/login');
  }
}
