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
    const token = sessionStorage.getItem("authToken");
  return axiosInstance.post("/auth/login", data, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token to backend
    },
  });
};

export const forgotPassword = (email: string) => {
  return axiosInstance.post(
    "/forgot-password",
    { email },
  );
}