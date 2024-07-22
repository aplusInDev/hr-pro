import httpClient from '../../services/httpClient';


export default async function action({ request }) {
  const formData = await request.formData();


  try {
    const response = await httpClient.post('/accounts',
      formData,
    );
    return response.data;
  } catch (err) {
    console.log('error: ', err);
    return err.response.data;
  }
}
