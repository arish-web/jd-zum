import axiosInstance from './axiosInstance';
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'tattoo' | 'photo';
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await axiosInstance.post('/register', data);
  return response.data;
}

export const login = (data: { email: string; password: string }) => {
  return axiosInstance.post('/auth/login', data);
};