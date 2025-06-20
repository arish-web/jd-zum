import axiosInstance from './axiosInstance';
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'tattoo' | 'photo';
}
export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await axiosInstance.post('/register', data);
  return response.data;
}

export const loginUser = (data: LoginPayload) => {
  return axiosInstance.post('/auth/login', data);
};