import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FormularioLogin from "../components/moleculas/FormularioLogin";
import HomePage from "../components/templates/HomePage";

const RoutesComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = (usuario: any) => {
    setIsAuthenticated(true);
    setUsuario(usuario);
    setError("");
  };

  const handleLoginFailure = (errorMsg: string) => {
    setIsAuthenticated(false);
    setUsuario(null);
    setError(errorMsg);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FormularioLogin
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        }
      />
      <Route
        path="/home"
        element={<HomePage isAuthenticated={isAuthenticated} usuario={usuario} onLogout={() => setIsAuthenticated(false)}/>}
      />
    </Routes>
  );
};

export default RoutesComponent;

