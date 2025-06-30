import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/index";
import { getPhotoById } from "../api/photo";
import type { Photo } from "../types";
import type { Appointment } from "../types";
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

function PhotosDetails() {
  const { id } = useParams<{ id: string }>();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleMakePhotoAppointment = async () => {
    if (!currentUser || currentUser.role !== "client" || !photo) return;

    const newAppointment: Appointment = {
      createdAt: new Date().toISOString(),
      userId: { name: currentUser.name },
      serviceId: { title: photo.title },
      serviceType: "photo",
      status: "pending",
    };

    try {
      await createAppointment(newAppointment);
      Notiflix.Notify.success("Photo appointment requested successfully!");
    } catch (err) {
      console.error("Photo Appointment Error:", err);
      Notiflix.Notify.failure("Failed to create photo appointment.");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchPhoto = async () => {
      try {
        const response = await getPhotoById(id);
        setPhoto(response.data);
      } catch (err) {
        console.error("Failed to fetch photo:", err);
        Notiflix.Notify.failure("Failed to load photo details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!photo) return <div>Photo not found</div>;

  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } w-full min-h-screen`}
    >
      {/* Banner */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        {photo.image ? (
          <img
            src={
              typeof photo.image === "string"
                ? photo.image
                : URL.createObjectURL(photo.image)
            }
            alt={photo.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {photo.title}
          </h1>
          <p className="mt-2 text-xl text-gray-300">#{photo.uniqueCode}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-semibold">Photographer:</span>{" "}
              {photo.photographer}
            </div>
            <div>
              <span className="font-semibold">Date:</span> {photo.date}
            </div>
            <div>
              <span className="font-semibold">Category:</span> {photo.category}
            </div>
          </div>

          <div className="text-4xl font-bold text-blue-500">₹{photo.price}</div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {photo.description}
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
                      await handleMakePhotoAppointment();
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

        {/* Photo Preview */}
        <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-8 shadow-xl h-fit">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Photo Preview
          </h3>
          <img
            src={
              typeof photo.image === "string"
                ? photo.image
                : URL.createObjectURL(photo.image)
            }
            alt="Photo"
            className="rounded-xl object-cover w-full h-80"
          />
        </div>
      </div>
    </div>
  );
}

export default PhotosDetails;
