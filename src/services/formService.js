export async function getForms(url) {
  try {
    const response = await fetch(url);
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

export async function postForm(url, info) {
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

export async function putForm(info) {
  try {
    const response = await fetch(info.uri, {
      method: 'PUT',
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

export async function deleteForm(id) {
  try {
    const url = `http://localhost:5000/api/v1/forms/${id}`
    const response = await fetch(url, {
      method: 'DELETE'
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

