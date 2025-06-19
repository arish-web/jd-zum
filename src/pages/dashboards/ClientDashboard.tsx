import { useEffect, useState } from "react";
import { getAllServices } from "../../api/user"; // adjust if needed
import { TattooCard } from "../../components/cards/TattooCard";
import { PhotoCard } from "../../components/cards/PhotoCard";
import type { Service } from "../../types/index";

const ClientDashboard = () => {
  const [tattoos, setTattoos] = useState<Service[]>([]);
 const [photos, setPhotos] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { tattoos, photos } = await getAllServices();
      setTattoos(tattoos);
      setPhotos(photos);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Available Tattoos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tattoos.map((tattoo) => (
            <TattooCard key={tattoo.id} data={tattoo} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Available Photoshoots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} data={photo} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;
