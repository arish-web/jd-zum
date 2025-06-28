import type { User } from '../types/index';

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
