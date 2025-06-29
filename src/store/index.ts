import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  role: string;
  email?: string;
  company?: string;
}

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useStore = create<AppState>((set) => {
  const storedUser = sessionStorage.getItem("currentUser");
  const storedToken = sessionStorage.getItem("token");


  return {
    isDarkMode: false,
    toggleDarkMode: () =>
      set((state) => ({ isDarkMode: !state.isDarkMode })),
    currentUser: storedUser ? JSON.parse(storedUser) : null,
    setCurrentUser: (user) => {
      if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("currentUser");
      }
      set({ currentUser: user });
    },
    token: storedToken || null,
    setToken: (token) => {
      if (token) {
        sessionStorage.setItem("token", token);
      } else {
        sessionStorage.removeItem("token");
      }
      set({ token });
    },
  };
});
