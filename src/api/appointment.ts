import axios from './axiosInstance';

export const createAppointment = (data: any) => axios.post('/appointments', data);
export const getAppointmentsForUser = (userId: any) => axios.get(`/appointments?userId=${userId}`);
export const getAppointmentsForServiceOwner = (ownerId: any) => axios.get(`/appointments?serviceOwnerId=${ownerId}`);