import axios from "./axiosInstance";

// ✅ api/payment.ts
export const createPaymentOrder = ({
  appointmentId,
  amount,
}: {
  appointmentId: string;
  amount: number;
}) => {
  const token = sessionStorage.getItem("authToken");

  return axios.post("/payment/create-order", { appointmentId, amount }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
