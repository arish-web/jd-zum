import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/index";
import type { Tattoo } from "../types";
import type { Appointment } from "../types";
import { getTattooById } from "../api/tattoo";
import Notiflix from "notiflix";
import { createAppointment } from "../api/appointment";
import PaymentModal from "../components/PaymentModal";
import { getAppointmentsForUser } from "../api/appointment";
import { useAuth } from "../context/AuthContext";

Notiflix.Confirm.init({
  width: "320px",
  borderRadius: "8px",
  titleColor: "#3B82F6", // Tailwind blue-500
  messageColor: "#333",
  backgroundColor: "#fff",
  okButtonBackground: "linear-gradient(to right, #3B82F6, #8B5CF6)", // blue-500 to purple-600
  okButtonColor: "#fff",
  cancelButtonBackground: "#f3f4f6",
  cancelButtonColor: "#374151",
  fontFamily: "inherit",
});

function TattooDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [tattoo, setTattoo] = useState<Tattoo | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePayment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowQRModal(true);
  };

  const handleMakeTattooAppointment = async () => {
    if (!currentUser || currentUser.role !== "client" || !tattoo) return;

    const newAppointment: Appointment = {
      _id: "",
      createdAt: new Date().toISOString(),
      userId: { _id: currentUser._id, name: currentUser.name },
      serviceId: {
        title: tattoo.title,
        category: tattoo.category,
        price: tattoo.price,
      },
      serviceType: "tattoo",
      status: "pending",
      paymentStatus: "Unpaid",
    };

    try {
      await createAppointment(newAppointment);
      Notiflix.Notify.success("Appointment requested successfully!");
    } catch (err) {
      console.error("Appointment Error:", err);
      Notiflix.Notify.failure("Failed to create appointment.");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchTattoo = async () => {
      try {
        const response = await getTattooById(id);
        setTattoo(response.data);
      } catch (err) {
        console.error("Failed to fetch tattoo:", err);
        Notiflix.Notify.failure("Failed to load tattoo details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTattoo();
  }, [id]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?._id) return;
      try {
        const res = await getAppointmentsForUser(user._id);
        setAppointments(res.data); // assuming the array is in res.data
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, [user]);


  if (loading) return <div>Loading...</div>;
  if (!tattoo) return <div>Tattoo not found</div>;

  return (
    // model - 1
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } w-full min-h-screen`}
    >
      {/* Full-width image banner */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        {tattoo.image ? (
          <img
            src={
              typeof tattoo.image === "string"
                ? tattoo.image
                : URL.createObjectURL(tattoo.image)
            }
            alt={tattoo.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl">
            No Image Available
          </div>
        )}

        {/* Overlay Gradient + Title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {tattoo.title}
          </h1>
          <p className="mt-2 text-xl text-gray-300">#{tattoo.uniqueCode}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Info */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-semibold">Artist:</span> {tattoo.artist}
            </div>
            <div>
              <span className="font-semibold">Date:</span> {tattoo.date}
            </div>
            <div>
              <span className="font-semibold">Style:</span> {tattoo.style}
            </div>
            <div>
              <span className="font-semibold">Size:</span> {tattoo.category}
            </div>
          </div>

          <div className="text-4xl font-bold text-blue-500">
            ₹{tattoo.price}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {tattoo.description}
            </p>
          </div>
          {currentUser?.role === "client" && (
            <button
              onClick={() => {
                Notiflix.Confirm.show(
                  "Confirm Appointment",
                  "Are you sure you want to make this appointment?",
                  "Yes",
                  "No",
                  async () => {
                    try {
                      await handleMakeTattooAppointment();
                    } catch (err) {}
                  }
                );
              }}
              className="mt-6 inline-block px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-md transition-all duration-300"
            >
              Make an Appointment
            </button>
          )}
        </div>

        {/* Right - Optional Secondary Image or Banner */}
        <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-8 shadow-xl h-fit">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Tattoo Preview
          </h3>
          <img
            src={
              typeof tattoo.image === "string"
                ? tattoo.image
                : URL.createObjectURL(tattoo.image)
            }
            alt="Tattoo"
            className="rounded-xl object-cover w-full h-80"
          />
        </div>
      </div>

      {currentUser?.role === "client" && (
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-md mb-10`}
        >
          <h3 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-700">
            Recent Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th className="px-6 py-3 text-left">Client Name</th>
                  <th className="px-6 py-3 text-left">Service Type</th>
                  <th className="px-6 py-3 text-left">Service Name</th>
                  <th className="px-6 py-3 text-left">Applied Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter((app) => app.serviceId?._id === id)
                  .map((app) => (
                    <tr
                      key={app._id}
                      className={
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4">
                        {app.userId?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {app.serviceType}
                      </td>
                      <td className="px-6 py-4">
                        {app.serviceId?.title || "Untitled"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(app.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer
                                        ${
                                          app.status === "pending"
                                            ? "bg-red-100 text-red-700"
                                            : ""
                                        }
                                        ${
                                          app.status === "accepted"
                                            ? "bg-green-100 text-green-700"
                                            : ""
                                        }
                                        ${
                                          app.status === "confirmed"
                                            ? "bg-blue-100 text-blue-700"
                                            : ""
                                        }
                                        ${
                                          app.status === "cancelled"
                                            ? "bg-gray-200 text-gray-600"
                                            : ""
                                        }
                                      `}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {app.paymentStatus === "Paid" ? (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                            Paid
                          </span>
                        ) : (
                          <button
                            className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            onClick={() => handlePayment(app)} // 🔁 Replace with your payment function
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showQRModal && selectedAppointment && (
        <PaymentModal
          appointment={selectedAppointment}
          onClose={() => setShowQRModal(false)}
          onSuccess={() =>
            setAppointments((prev) =>
              prev.map((app) =>
                app._id === selectedAppointment._id
                  ? { ...app, paymentStatus: "Paid" }
                  : app
              )
            )
          }
        />
      )}
    </div>
  );
}

export default TattooDetails;
