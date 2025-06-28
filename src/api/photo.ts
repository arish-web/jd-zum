import axios from "./axiosInstance";

export const getAllPhotos = () => {
  //   const token = sessionStorage.getItem("authToken");
  return axios.get("/photos", {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const getPhotoById = (id: any) => {
  //   const token = sessionStorage.getItem("authToken");
  return axios.get(`/photos/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const addPhoto = (data: any) => {
  const token = sessionStorage.getItem("authToken");
  return axios.post("/photos", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePhoto = (id: any, data: any) => {
  const token = sessionStorage.getItem("authToken");
  return axios.put(`/photos/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const softDeletePhoto = (id: any) => {
  const token = sessionStorage.getItem("authToken");
  return axios.patch(`/photos/${id}/delete`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
