import httpClient from "./httpClient";

// export async function postField(id, info) {
//   const url = `http://localhost:5000/api/v1/forms/${id}/fields`;
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(info)
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export async function postField(id ,info) {
  try {
    const response = await httpClient.post(`/forms/${id}/fields`, info);
    return response.data;
  } catch (error) {
    return null;
  }
}

// export async function getFields(formId) {
//   const url = `http://localhost:5000/api/v1/forms/${formId}/fields`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export async function getFields(formId) {
  try {
    const response = await httpClient.get(`/forms/${formId}/fields`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// export async function getAllFields(formName, companyId) {
//   if (!formName || !companyId) {
//     return null;
//   }
//   const url = `http://localhost:5000/api/v1/fields?form_name=${formName}&company_id=${companyId}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export async function getAllFields(formName, companyId) {
  try {
    const response = await httpClient.get(`/fields?form_name=${formName}&company_id=${companyId}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// export async function putField(fieldUrl, info) {
//   try {
//     const response = await fetch(fieldUrl, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(info)
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export async function putField(fieldUrl, info) {
  try {
    const response = await httpClient.put(fieldUrl, info);
    return response.data;
  } catch (error) {
    return null;
  }
}

// export async function deleteField(fieldUrl) {
//   try {
//     const response = await fetch(fieldUrl, {
//       method: 'DELETE'
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }

export async function deleteField(fieldUrl) {
  try {
    const response = await httpClient.delete(fieldUrl);
    return response.data;
  } catch (error) {
    return null;
  }
}
