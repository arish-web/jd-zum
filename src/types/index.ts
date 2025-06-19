// types/index.ts
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   category: 'client' | 'tattoo' | 'photo';
// }
export interface User {
  id: string;
  name: string;
  email: string;
  category: 'client' | 'tattoo' | 'photo';
}

export interface Tattoo {
  id: string;
  title: string;
  description: string;
  price: number;
  createdBy: string;
  deleted?: boolean;
}

export interface PhotoShoot {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string; // birthday, baby shower etc.
  createdBy: string;
  deleted?: boolean;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  serviceType: 'tattoo' | 'photo';
  status: 'pending' | 'confirmed';
}

export type Service = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
};