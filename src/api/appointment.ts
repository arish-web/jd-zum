import axios from "./axiosInstance";

// Create Appointment (with token from sessionStorage)
export const createAppointment = (data: any) => {
  const token = sessionStorage.getItem("authToken");
  return axios.post("/appointments", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markAppointmentAsPaid = async (id: string) => {
  const token = sessionStorage.getItem("authToken"); // or get from auth context
  return await axios.patch(`/appointments/${id}/pay`, {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// update the appoinment status
export const updateAppointmentStatus = (id: string, status: string) => {
  const token = sessionStorage.getItem("authToken");
  return axios.put(
    `/appointments/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get appointments for a specific user
export const getAppointmentsForUser = (userId: string) => {
  const token = sessionStorage.getItem("authToken");
  return axios.get(`/appointmentuser?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get appointments for a service owner (e.g., tattoo artist or photographer)
export const getAppointmentsForServiceOwner = (ownerId: string) => {
  const token = sessionStorage.getItem("authToken");
  return axios.get(`/appointmentservice?serviceOwnerId=${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
