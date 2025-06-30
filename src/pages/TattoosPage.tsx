import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import Notiflix from "notiflix";
import {
  getAllTattoos,
  addTattoo,
  updateTattoo,
  softDeleteTattoo,
} from "../api/tattoo"; // adjust your paths
import { useTheme } from "../context/ThemeContext";
import { useStore } from "../store/index";
import Navbar from "../components/navbar/Navbar";

export interface Tattoo {
  _id?: string;
  title: string;
  description: string;
  artist: string;
  style: string;
  category: string;
  date: string; // ISO string is fine
  price: string;
  uniqueCode: string;
  image: string | File;
}

function TattoosPage() {
  const { isDarkMode } = useTheme();
  const currentUser = useStore((state) => state.currentUser);
  const [loading, setLoading] = useState(true);
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [editingTattoo, setEditingTattoo] = useState<Tattoo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const initialTattoo: Tattoo = {
    _id: currentUser?._id,
    title: "",
    description: "",
    artist: "",
    style: "",
    category: "",
    date: "",
    price: "",
    uniqueCode: "",
    image: "",
  };

  Notiflix.Confirm.init({
    titleColor: "#DC2626",
    okButtonBackground: "#DC2626",
    okButtonColor: "#fff",
    cancelButtonBackground: "#E5E7EB",
    cancelButtonColor: "#000",
  });

  const [newTattoo, setNewTattoo] = useState<Tattoo>(initialTattoo);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getAllTattoos();
        setTattoos(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    try {
      if (editingTattoo) {
        const response = await updateTattoo(editingTattoo._id, newTattoo);
        const updated = response.data;
        setTattoos(tattoos.map((t) => (t._id === updated._id ? updated : t)));
        Notiflix.Notify.success("Tattoo updated successfully");
      } else {
        const response = await addTattoo(newTattoo);
        const created = response.data;
        setTattoos([...tattoos, created]);
        Notiflix.Notify.success("Tattoo added successfully");
      }
      setShowForm(false);
      setNewTattoo(initialTattoo);
      setEditingTattoo(null);
    } catch (err) {
      Notiflix.Notify.failure("Failed to save tattoo");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`min-h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Tattoos Collection</h1>

        {/* Search */}
        <div className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search tattoos..."
            className="w-full bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Tattoo Button */}
        {currentUser?.role === "tattoo" && (
          <>
            {!showForm ? (
              <button
                onClick={() => {
                  setDisabled(true); // Disable the button immediately
                  setShowForm(true); // Trigger your logic
                }}
                disabled={disabled}
                className={`mt-4 flex items-center px-4 py-3 text-white rounded-lg transition ${
                  disabled
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tattoo
              </button>
            ) : (
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(); // ✅ handles add & update
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
              >
                <input
                  type="text"
                  placeholder="Tattoo Name"
                  value={newTattoo.title}
                  onChange={(e) =>
                    setNewTattoo({ ...newTattoo, title: e.target.value })
                  }
                  required
                  minLength={3}
                  className="p-3 rounded border dark:bg-gray-900"
                />

                <input
                  type="text"
                  placeholder="artist"
                  value={newTattoo.artist}
                  onChange={(e) =>
                    setNewTattoo({ ...newTattoo, artist: e.target.value })
                  }
                  required
                  minLength={3}
                  className="p-3 rounded border dark:bg-gray-900"
                />

                <textarea
                  placeholder="Description"
                  value={newTattoo.description || ""}
                  onChange={(e) =>
                    setNewTattoo({ ...newTattoo, description: e.target.value })
                  }
                  required
                  minLength={10}
                  className="p-3 rounded border dark:bg-gray-900 col-span-full"
                />

                <select
                  value={newTattoo.category || ""}
                  onChange={(e) =>
                    setNewTattoo({ ...newTattoo, category: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                >
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Custom">Custom</option>
                </select>

                <input
                  type="number"
                  placeholder="Price ₹"
                  value={newTattoo.price}
                  onChange={(e) =>
                    setNewTattoo({
                      ...newTattoo,
                      price: e.target.value,
                    })
                  }
                  required
                  min={100}
                  className="p-3 rounded border dark:bg-gray-900"
                />

                <input
                  type="text"
                  placeholder="Style"
                  value={newTattoo.style}
                  onChange={(e) =>
                    setNewTattoo({ ...newTattoo, style: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                />

                <input
                  type="date"
                  value={newTattoo.date}
                  onChange={(e) =>
                    setNewTattoo({ ...newTattoo, date: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                />

                <input
                  type="text"
                  placeholder="Unique Code"
                  value={newTattoo.uniqueCode || ""}
                  onChange={(e) =>
                    setNewTattoo({
                      ...newTattoo,
                      uniqueCode: e.target.value.trim(),
                    })
                  }
                  required
                  pattern="[A-Z0-9]{6,}"
                  title="At least 6 characters, uppercase or numbers"
                  className="p-3 rounded border dark:bg-gray-900"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === "string") {
                          setNewTattoo({ ...newTattoo, image: reader.result }); // ✅ safe assignment
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                {/* ✅ Submit & Cancel buttons */}
                <div className="col-span-full flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={disabled}
                    className={`mt-4 flex items-center px-4 py-3 text-white rounded-lg transition ${
                      disabled
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {editingTattoo ? "Update Tattoo" : "Add Tattoo"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setNewTattoo(initialTattoo);
                      setEditingTattoo(null);
                    }}
                    className="mt-4 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tattoos.map((tattoo) => (
          <div
            key={tattoo._id}
            className={`relative group overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
                : "bg-white shadow-md text-gray-800"
            } rounded-2xl border border-gray-200 hover:shadow-xl`}
          >
            {/* Image */}
            <Link to={`/tattoos/${tattoo._id}`}>
              <div className="h-48 w-full bg-white-200 flex items-center justify-center">
                {tattoo.image ? (
                  <img
                    src={
                      typeof tattoo.image === "string"
                        ? tattoo.image
                        : URL.createObjectURL(tattoo.image)
                    }
                    alt={tattoo.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="p-5">
              <Link to={`/tattoos/${tattoo._id}`}>
                <h2 className="text-xl font-extrabold mb-2 tracking-tight hover:underline">
                  {tattoo.title}
                </h2>
              </Link>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium text-gray-500">Artist:</span>{" "}
                  {tattoo.artist}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Style:</span>{" "}
                  {tattoo.style}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Category:</span>{" "}
                  {tattoo.category}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Date:</span>{" "}
                  {tattoo.date}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xl font-semibold text-blue-600">
                  ₹{tattoo.price}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-sm">
                  #{tattoo.uniqueCode}
                </span>
              </div>

              {/* Buttons */}
              {currentUser?.role === "tattoo" && (
                <div className="flex justify-end items-center gap-3 mt-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTattoo(tattoo);
                      setNewTattoo(tattoo);
                      setShowForm(true);
                      setTimeout(() => {
                        formRef.current?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="text-green-500 hover:text-green-700 mr-2 mt-2"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      Notiflix.Confirm.show(
                        "Confirm Delete",
                        "Are you sure you want to delete this tattoo?",
                        "Yes",
                        "No",
                        async () => {
                          try {
                            await softDeleteTattoo(tattoo._id);
                            setTattoos(
                              tattoos.filter((t) => t._id !== tattoo._id)
                            );
                            Notiflix.Notify.success(
                              "Tattoo deleted successfully!"
                            );
                          } catch (err) {
                            Notiflix.Notify.failure("Failed to delete tattoo.");
                          }
                        }
                      );
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TattoosPage;
