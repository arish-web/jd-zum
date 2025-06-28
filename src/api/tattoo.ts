import axios from './axiosInstance';

export const getAllTattoos = async () => {
  // const token = sessionStorage.getItem("authToken"); 
  return axios.get("/tattoos", {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const getTattooById = (id: string) => {
  // const token = sessionStorage.getItem("authToken");
  return axios.get(`/tattoos/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const addTattoo = (data: any) => {
  const token = sessionStorage.getItem("authToken");
  return axios.post("/tattoos", data, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token to backend
    },
  });
};

export const updateTattoo = (id: any, data: any) => {
  const token = sessionStorage.getItem("authToken");
    return axios.put(`/tattoos/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ send token to backend
    },
  });
}
  
export const softDeleteTattoo = (id: any) => {
  const token = sessionStorage.getItem("authToken");
  return axios.patch(`/tattoos/${id}/delete`, {}, // No body needed for this request
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Proper header placement
      },
    }
  );
};
