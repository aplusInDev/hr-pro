const httpClient = (endpoint, options) => {
  const defaultOptions = {
    method: 'GET', // Default is GET, but you can set POST, PUT, DELETE, etc.
    credentials: 'include', // This is the equivalent of 'withCredentials: true' in axios
    headers: {
      // Set any default headers here
      'Content-Type': 'application/json'
    },
  };

  // Merge the default options with any options passed to the function
  const fetchOptions = { ...defaultOptions, ...options };

  // Prepend the baseURL to the endpoint provided
  const url = `http://localhost:5000/api/v1/${endpoint}`;

  // Return the fetch promise
  return fetch(url, fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
};

// Usage example:
// httpClient('your-endpoint', { method: 'POST', body: JSON.stringify(yourData) })
//   .then(data => console.log(data))
//   .catch(error => console.error(error));


export default httpClient;
