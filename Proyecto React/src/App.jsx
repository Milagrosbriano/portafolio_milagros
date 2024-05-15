import React from "react";
import Tablero from "./Paginas/Tablero/Tablero";
import DetallesDeporte from "./Paginas/DetallesTarea/DetallesDeporte"; // Aquí ajusta la ruta de importación
import NuevaTarea from "./Paginas/NuevaTarea/NuevaTarea";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tablero />} />
        <Route path="/detalles/:id" element={<DetallesDeporte />} />
        <Route path="/nueva-tarea" element={<NuevaTarea />} />
      </Routes>
    </BrowserRouter>
  );
}
