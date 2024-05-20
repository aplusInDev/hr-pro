export const handleDownload = async (response, fileName) => {
  try {
    // Create a URL for the Blob
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    // Create a temporary anchor tag to trigger download
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', fileName); // Name the file
    document.body.appendChild(fileLink);
    
    fileLink.click(); // Trigger the download
    
    window.URL.revokeObjectURL(fileURL); // Clean up the URL object
    document.body.removeChild(fileLink); // Remove the temporary link
  } catch (error) {
    console.error('Download error:', error);
  }
};
