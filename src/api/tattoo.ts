import axios from './axiosInstance';

export const getAllTattoos = () => axios.get('/tattoos');
export const getTattooById = (id: any) => axios.get(`/tattoos/${id}`);
export const createTattoo = (data: any) => axios.post('/tattoos', data);
export const updateTattoo = (id: any, data: any) => axios.put(`/tattoos/${id}`, data);
export const softDeleteTattoo = (id: any) => axios.patch(`/tattoos/${id}/delete`);