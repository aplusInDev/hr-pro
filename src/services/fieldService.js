export async function postField(id, info) {
  const url = `http://localhost:5000/api/v1/forms/${id}/fields`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    console.log('completed');
  }
}

export async function getFields(formId) {
  const url = `http://localhost:5000/api/v1/forms/${formId}/fields`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function putField(fieldUrl, info) {
  try {
    const response = await fetch(fieldUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteField(fieldUrl) {
  try {
    const response = await fetch(fieldUrl, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
