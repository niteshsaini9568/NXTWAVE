import axios from 'axios';

export default axios.create({
  baseURL: 'https://nxtwave-l75r.onrender.com',
  withCredentials: true,
});
