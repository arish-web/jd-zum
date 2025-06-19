import axios from './axiosInstance';

export const getAllPhotos = () => axios.get('/photos');
export const getPhotoById = (id) => axios.get(`/photos/${id}`);
export const createPhoto = (data) => axios.post('/photos', data);
export const updatePhoto = (id, data) => axios.put(`/photos/${id}`, data);
export const softDeletePhoto = (id) => axios.patch(`/photos/${id}/delete`);