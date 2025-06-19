// import axios from './axiosInstance';
import axiosInstance from './axiosInstance';

export const getUserProfile = () => axiosInstance.get('/users/me');

// ✅ Add this to fix the missing getAllServices
export const getAllServices = async () => {
  const tattoos = await axiosInstance.get('/tattoos');
  const photos = await axiosInstance.get('/photos');
  return {
    tattoos: tattoos.data,
    photos: photos.data
  };
};