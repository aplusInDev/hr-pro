import httpClient from '../../services/httpClient';
import { defer, redirect } from 'react-router-dom';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const company_id = currentUser?.company_id
const employee_id = currentUser?.employee_id

export default async function profileLoader() {
  try {
    const employee = await httpClient.get(`/employees/${employee_id}`);
    const employeeFields = await httpClient.get(`/fields?form_name=employee&company_id=${company_id}`);
    return defer({employee: employee.data, employeeFields: employeeFields.data});
  } catch (err) {
    console.log('erro: ', err);
    return redirect('/login');
  }
}
