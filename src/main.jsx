import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Rutas } from "./routes/Rutas.jsx";
import { AuthProvider } from "./context/AuthContext";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Rutas />
        </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>
);
