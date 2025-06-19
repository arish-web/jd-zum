import { useEffect, useState } from "react";
import { getAllPhotos } from "../../api/photo";
import { AppointmentCard } from "../../components/cards/AppointmentCard";
import { PhotoCard } from "../../components/cards/PhotoCard";
import type { Appointment } from "../../types/index";

const PhotoDashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPhotos();
      setPhotos(res.data.photos);
      setAppointments(res.data.appointments);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Photographer Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Your Photoshoots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} data={photo} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Appointments</h2>
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} />
        ))}
      </section>
    </div>
  );
};

export default PhotoDashboard;
