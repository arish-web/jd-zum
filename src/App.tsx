import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import { useStore } from "./store";
import { useEffect } from "react";

function App() {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setToken = useStore((state) => state.setToken);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
