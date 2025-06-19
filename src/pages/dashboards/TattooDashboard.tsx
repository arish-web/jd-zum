import { useEffect, useState } from "react";
import { getAllTattoos } from "../../api/tattoo"; // adjust path if needed
import { AppointmentCard } from "../../components/cards/AppointmentCard";
import { TattooCard } from "../../components/cards/TattooCard";
import type { Appointment } from "../../types/index";

const TattooDashboard = () => {
  const [tattoos, setTattoos] = useState([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllTattoos(); // assumes current user only
      setTattoos(res.data.tattoos);
      setAppointments(res.data.appointments);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tattoo Artist Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Your Tattoos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tattoos.map((tattoo) => (
            <TattooCard key={tattoo.id} data={tattoo} />
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

export default TattooDashboard;
