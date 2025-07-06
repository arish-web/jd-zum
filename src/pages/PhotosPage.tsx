import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import Notiflix from "notiflix";
import {
  getAllPhotos,
  addPhoto,
  updatePhoto,
  softDeletePhoto,
} from "../api/photo";
import { useStore } from "../store/index";
import Navbar from "../components/navbar/Navbar";
import { useTheme } from "../context/ThemeContext";

export interface Photo {
  _id?: string;
  title: string;
  description: string;
  photographer: string;
  category: string;
  date: string;
  price: string;
  uniqueCode: string;
  image: string | File;
  ownerId: string;
}

function PhotosPage() {
  const { isDarkMode } = useTheme();
  const currentUser = useStore((state) => state.currentUser);

  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const initialPhoto: Photo = {
    _id: currentUser?._id,
    title: "",
    description: "",
    photographer: "",
    category: "",
    date: "",
    price: "",
    uniqueCode: "",
    image: "",
    ownerId: "",
  };

  Notiflix.Confirm.init({
    titleColor: "#DC2626",
    okButtonBackground: "#DC2626",
    okButtonColor: "#fff",
    cancelButtonBackground: "#E5E7EB",
    cancelButtonColor: "#000",
  });

  const [newPhoto, setNewPhoto] = useState<Photo>(initialPhoto);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getAllPhotos();
        setPhotos(response.data);
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
      if (editingPhoto) {
        const response = await updatePhoto(editingPhoto._id, newPhoto);
        const updated = response.data;
        setPhotos(photos.map((p) => (p._id === updated._id ? updated : p)));
        Notiflix.Notify.success("Photo updated successfully");
      } else {
        const response = await addPhoto(newPhoto);
        const created = response.data;
        setPhotos([...photos, created]);
        Notiflix.Notify.success("Photo added successfully");
      }
      setShowForm(false);
      setNewPhoto(initialPhoto);
      setEditingPhoto(null);
    } catch (err) {
      Notiflix.Notify.failure("Failed to save photo");
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
        <h1 className="text-3xl font-bold mb-4">Photo Gallery</h1>

        <div className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by title"
            className="w-full bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {currentUser?.role === "photo" && (
          <>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Photography
              </button>
            ) : (
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
              >
                <input
                  type="text"
                  placeholder="Photo Title"
                  value={newPhoto.title}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, title: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                />
                <input
                  type="text"
                  placeholder="Photographer"
                  value={newPhoto.photographer}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, photographer: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                />
                <textarea
                  placeholder="Description"
                  value={newPhoto.description}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, description: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900 col-span-full"
                />
                <select
                  name="category"
                  value={newPhoto.category}
                  onChange={(e) =>
                    setNewPhoto({
                      ...newPhoto,
                      category: e.target.value as Photo["category"],
                    })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Category</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Nature">Nature</option>
                  <option value="Event">Event</option>
                  <option value="Street">Street</option>
                  <option value="Studio">Studio</option>
                  <option value="Product">Product</option>
                  <option value="Documentary">Documentary</option>
                </select>

                <input
                  type="number"
                  placeholder="Price ₹"
                  value={newPhoto.price}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, price: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                />
                <input
                  type="date"
                  value={newPhoto.date}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, date: e.target.value })
                  }
                  required
                  className="p-3 rounded border dark:bg-gray-900"
                />
                <input
                  type="text"
                  placeholder="Unique Code"
                  value={newPhoto.uniqueCode}
                  onChange={(e) =>
                    setNewPhoto({
                      ...newPhoto,
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
                          setNewPhoto({ ...newPhoto, image: reader.result });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="col-span-full flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="mt-4 flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingPhoto ? "Update Photo" : "Add Photography"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setNewPhoto(initialPhoto);
                      setEditingPhoto(null);
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.filter((photo) => photo.ownerId === currentUser?._id).map((photo) => (
          <div
            key={photo._id}
            className={`relative group overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
                : "bg-white shadow-md text-gray-800"
            } rounded-2xl border border-gray-200 hover:shadow-xl`}
          >
            {/* Wrap only image in Link */}
            <Link to={`/photos/${photo._id}`}>
              <div className="h-48 w-full bg-white-200 flex items-center justify-center">
                {photo.image ? (
                  <img
                    src={
                      typeof photo.image === "string"
                        ? photo.image
                        : URL.createObjectURL(photo.image)
                    }
                    alt={photo.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
            </Link>

            {/* Card Content */}
            <div className="p-5">
              {/* Title wrapped in Link */}
              <Link to={`/photos/${photo._id}`}>
                <h2 className="text-xl font-extrabold mb-2 tracking-tight hover:underline">
                  {photo.title}
                </h2>
              </Link>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium text-gray-500">
                    Photographer:
                  </span>{" "}
                  {photo.photographer}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Category:</span>{" "}
                  {photo.category}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Date:</span>{" "}
                  {photo.date}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xl font-semibold text-blue-600">
                  ₹{photo.price}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-sm">
                  #{photo.uniqueCode}
                </span>
              </div>

              {/* Admin Actions */}
              {currentUser?.role === "photo" && (
                <div className="flex justify-end items-center gap-3 mt-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPhoto(photo);
                      setNewPhoto(photo);
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
                        "Are you sure you want to delete this photo?",
                        "Yes",
                        "No",
                        async () => {
                          try {
                            await softDeletePhoto(photo._id);
                            setPhotos(
                              photos.filter((p) => p._id !== photo._id)
                            );
                            Notiflix.Notify.success(
                              "Photo deleted successfully!"
                            );
                          } catch (err) {
                            Notiflix.Notify.failure("Failed to delete photo.");
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

      {/* design 1 */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {photos.map((photo) => (
    <div
      key={photo._id}
      className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md z-10">
        #{photo.uniqueCode}
      </div>

      <div className="h-56 w-full overflow-hidden rounded-t-3xl">
        {photo.image ? (
          <img
            src={typeof photo.image === "string" ? photo.image : URL.createObjectURL(photo.image)}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white bg-gray-700">
            No Image
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-b-3xl space-y-2 relative z-10">
        <h3 className="text-2xl font-bold">{photo.title}</h3>
        <p className="text-sm">📸 {photo.photographer}</p>
        <p className="text-sm">🎯 {photo.category}</p>
        <p className="text-sm">📅 {photo.date}</p>
        <div className="flex items-center justify-between pt-4">
          <span className="font-bold text-lg text-green-600 dark:text-green-400">
            ₹{photo.price}
          </span>
          {currentUser?.role === "photo" && (
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingPhoto(photo);
                  setNewPhoto(photo);
                  setShowForm(true);
                  setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  Notiflix.Confirm.show(
                    "Confirm Delete",
                    "Are you sure you want to delete this photo?",
                    "Yes",
                    "No",
                    async () => {
                      try {
                        await softDeletePhoto(photo._id);
                        setPhotos(photos.filter((p) => p._id !== photo._id));
                        Notiflix.Notify.success("Photo deleted successfully!");
                      } catch (err) {
                        Notiflix.Notify.failure("Failed to delete photo.");
                      }
                    }
                  );
                }}
                className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div> */}
      {/* design 2 */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {photos.map((photo) => (
    <div
      key={photo._id}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="overflow-hidden h-56 w-full">
        {photo.image ? (
          <img
            src={typeof photo.image === "string" ? photo.image : URL.createObjectURL(photo.image)}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-800">
            No Image
          </div>
        )}
      </div>

      <div className="p-5 text-gray-800 dark:text-gray-200">
        <h3 className="text-lg font-semibold">{photo.title}</h3>
        <p className="text-sm">📸 {photo.photographer}</p>
        <p className="text-sm">📂 {photo.category}</p>
        <p className="text-sm">📅 {photo.date}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 dark:text-blue-400 font-bold">₹{photo.price}</span>
          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">#{photo.uniqueCode}</span>
        </div>

        {currentUser?.role === "photo" && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingPhoto(photo);
                setNewPhoto(photo);
                setShowForm(true);
                setTimeout(() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="text-green-600 hover:text-green-800"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                Notiflix.Confirm.show(
                  "Confirm Delete",
                  "Are you sure you want to delete this photo?",
                  "Yes",
                  "No",
                  async () => {
                    try {
                      await softDeletePhoto(photo._id);
                      setPhotos(photos.filter((p) => p._id !== photo._id));
                      Notiflix.Notify.success("Photo deleted successfully!");
                    } catch (err) {
                      Notiflix.Notify.failure("Failed to delete photo.");
                    }
                  }
                );
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div> */}
    </div>
  );
}

export default PhotosPage;
