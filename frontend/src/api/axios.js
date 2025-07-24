import axios from 'axios';

// Create a configured instance of axios for API calls
const instance = axios.create({
  // IMPORTANT: Replace this with your actual backend URL
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // Allows sending cookies with requests
});

export default instance;