import { useEffect, useState } from "react";
// import { useStore } from "../store";
import { getAllPhotos } from "../api/photo";
import { getAllTattoos } from "../api/tattoo";
import Navbar from "../components/navbar/Navbar";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import type { Photo } from "../types";
import type { Tattoo } from "../types";

function ServicesPage() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [filter, setFilter] = useState<"all" | "photos" | "tattoos">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoRes = await getAllPhotos();
        const tattooRes = await getAllTattoos();
        setPhotos(photoRes.data);
        setTattoos(tattooRes.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = [
    ...(filter === "all" || filter === "photos"
      ? photos.map((item) => ({ ...item, type: "photo" }))
      : []),
    ...(filter === "all" || filter === "tattoos"
      ? tattoos.map((item) => ({ ...item, type: "tattoo" }))
      : []),
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`min-h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All</option>
          <option value="photos">Photos</option>
          <option value="tattoos">Tattoos</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <Link to={`/${item.type}s/${item._id}`}>
              <div className="h-48 w-full">
                <img
                  src={typeof item.image === "string" ? item.image : ""}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <div className="p-5">
              <Link to={`/${item.type}s/${item._id}`}>
                <h2 className="text-xl font-bold hover:underline">
                  {item.title}
                </h2>
              </Link>
              <div className="text-sm space-y-1 mt-1">
                <p>
                  <span className="text-gray-500">Category:</span>{" "}
                  {item.category}
                </p>
                <p>
                  <span className="text-gray-500">
                    {item.type === "photo" ? "Photographer" : "Artist"}:
                  </span>{" "}
                  {item.type === "photo"
                    ? (item as Photo).photographer
                    : (item as Tattoo).artist}
                </p>
                <p>
                  <span className="text-gray-500">Date:</span> {item.date}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-blue-600 font-semibold text-lg">
                  ₹{item.price}
                </span>
                <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                  #{item.uniqueCode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
