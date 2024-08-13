import httpClient from '../../services/httpClient';

export default async function rootLoader() {
  
  try {
    const response = await httpClient.get('/check_login');
    if (response.data.message === 'ok') {
      return true;
    }
    return false;
  } catch (err) {
    console.log('error: ', err);
    return false;
  }
}
