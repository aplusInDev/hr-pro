// import axios from 'axios';

export const handleDownload = async (response) => {
  try {
    // const response = await axios({
    //   method: 'GET',
    //   url: '/download_response', // Your Flask endpoint
    //   responseType: 'blob', // Important to process the response as a Blob
    // });

    // Create a URL for the Blob
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    // Create a temporary anchor tag to trigger download
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', 'file.xlsx'); // Name the file
    document.body.appendChild(fileLink);
    
    fileLink.click(); // Trigger the download
    
    window.URL.revokeObjectURL(fileURL); // Clean up the URL object
    document.body.removeChild(fileLink); // Remove the temporary link
  } catch (error) {
    console.error('Download error:', error);
  }
};