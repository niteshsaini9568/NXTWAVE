import axios from 'axios';

export default axios.create({
  // baseURL: 'https://nxtwave-l75r.onrender.com',
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});
