// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// });

// instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // ✅ for sending cookies
});

export default instance;

