import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/index";
import type { Tattoo } from "../types";
import type { Appointment } from "../types";
// import type { Photo } from "../types";
import { getTattooById } from "../api/tattoo";
import Notiflix from "notiflix";
import { createAppointment } from "../api/appointment";

Notiflix.Confirm.init({
  width: '320px',
  borderRadius: '8px',
  titleColor: '#3B82F6', // Tailwind blue-500
  messageColor: '#333',
  backgroundColor: '#fff',
  okButtonBackground: 'linear-gradient(to right, #3B82F6, #8B5CF6)', // blue-500 to purple-600
  okButtonColor: '#fff',
  cancelButtonBackground: '#f3f4f6',
  cancelButtonColor: '#374151',
  fontFamily: 'inherit',
});

function TattooDetails() {
  const { id } = useParams<{ id: string }>();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const [tattoo, setTattoo] = useState<Tattoo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleMakeTattooAppointment = async () => {
    if (!currentUser || currentUser.role !== "client" || !tattoo) return;

    const newAppointment: Appointment = {
      createdAt: new Date().toISOString(),
      userId: { name: currentUser.name },
      serviceId: { title: tattoo.title },
      serviceType: "tattoo",
      status: "pending",
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

  if (loading) return <div>Loading...</div>;
  if (!tattoo) return <div>Tattoo not found</div>;

  return (
    // model -1
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
                    } catch (err) {
                    }
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
    </div>
  );
}

export default TattooDetails;
