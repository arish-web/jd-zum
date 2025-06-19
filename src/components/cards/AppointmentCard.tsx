type AppointmentCardProps = {
  data: {
    id: number;
    date: string;
    time: string;
    clientName: string;
    serviceType: string; // e.g., "Tattoo" or "Photo"
  };
};

export const AppointmentCard = ({ data }: AppointmentCardProps) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{data.serviceType} Appointment</h3>
      <p><strong>Client:</strong> {data.clientName}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Time:</strong> {data.time}</p>
    </div>
  );
};
