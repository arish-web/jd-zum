export interface User {
  _id?: string;
  name: string;
  email: string;
  category: "client" | "tattoo" | "photo";
}

export interface Tattoo {
  _id?: string;
  title: string;
  description: string;
  artist: string;
  style: string;
  category: string;
  date: string;         // ISO string is fine
  price: number;
  uniqueCode: string;
  image: string | File;
  ownerId: string;
}

export interface Photo {
  _id: "",
  title: string;
  photographer: string;
  category:
    | "Portrait"
    | "Wedding"
    | "Fashion"
    | "Nature"
    | "Event"
    | "Street"
    | "Studio"
    | "Product"
    | "Documentary"; // from select dropdown
  size: string; // e.g., 4x6 or 1920x1080
  date: string; // ISO format (from input[type="date"])
  price: number;
  uniqueCode: string;
  image: string | File;
  description?: string; // if you plan to add description later
  createdBy: string; // currentUser.id
  deleted?: boolean;
}


export interface Appointment {
  _id: string;
  createdAt: string;
  userId: {
    _id?: string;
    name: string;
  };
  serviceType: "tattoo" | "photo";
  serviceId: {
    _id?: string;
    title: string;
    category?: string
    price?: number;
  };
  status: "pending" | "confirmed" | "cancelled" | "accepted";
  paymentStatus: "Unpaid" | "Paid"; 
}

export type Service = {
  // id: number;
  title: string;
  description: string;
  imageUrl?: string;
};
