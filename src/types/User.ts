export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tattoo' | 'photo' | 'client'; // adjust roles as needed
}
