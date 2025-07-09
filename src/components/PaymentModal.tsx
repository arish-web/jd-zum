import React, { useEffect } from "react";
import Notiflix from "notiflix";
import { createPaymentOrder } from "../api/payment";
import { markAppointmentAsPaid } from "../api/appointment";
import type { Appointment } from "../types/index";

interface PaymentModalProps {
  appointment: Appointment;
  onClose: () => void;
  onSuccess: () => void;
}

// ---- Razorpay Global Declaration ----
declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  appointment,
  onClose,
  onSuccess,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayNow = async () => {
    try {
      if (!appointment._id || !appointment.serviceId.price) {
        Notiflix.Notify.failure("Invalid appointment details.");
        return;
      }

      Notiflix.Loading.standard("Creating order...");

      // Step 1: Create Razorpay order
      const { data } = await createPaymentOrder({
        amount: appointment.serviceId.price,
        appointmentId: appointment._id,
      });

      const { order } = data;
      Notiflix.Loading.remove();

      // Step 2: Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "I n k L e n s Studio",
        description: appointment.serviceId.title,
        order_id: order.id,
        handler: async function () {
          try {
            Notiflix.Loading.standard("Verifying payment...");
            await markAppointmentAsPaid(appointment._id!);
            Notiflix.Loading.remove();
            Notiflix.Notify.success("Payment successful!");
            onSuccess();
            onClose();
          } catch (err) {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure("Failed to verify payment.");
          }
        },
        prefill: {
          name: appointment.userId.name || "Guest",
          // email: appointment.userId.email || "test@example.com",
        },
        theme: {
          color: "#6366F1",
        },
      };

      // Step 3: Open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      Notiflix.Loading.remove();
      console.error("Payment error:", error);
      Notiflix.Notify.failure("Failed to initiate payment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[320px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Pay Now</h2>

        <p className="text-center text-gray-600 mb-3">
          Amount: ₹{appointment.serviceId.price}
        </p>

        <button
          onClick={handlePayNow}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
