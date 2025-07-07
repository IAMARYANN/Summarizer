import axios from 'axios';

export const SendApi = async (filedata) => {
  try {
    const formData = new FormData();
    formData.append('file', filedata);
    
    const response = await axios.post('http://localhost:5000/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;  // Return the response data from the backend
  } catch (error) {
    // Throw a properly instantiated error
    throw new Error("Connection Failed: " + error.message);
  }
};