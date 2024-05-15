import React, { useState, useEffect } from "react";
import DeporteTarjeta from "../../Componentes/DeporteTarjeta";

const Tablero = () => {
  const [deportes, setDeportes] = useState([]);

  useEffect(() => {
    cargarDeportes(); 
  }, []);

  const cargarDeportes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/games");
      if (response.ok) {
        const data = await response.json();
        setDeportes(data); 
      } else {
        console.error("Error al cargar deportes");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const handleEliminarDeporte = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const nuevosDeportes = deportes.filter((deporte) => deporte.id !== id);
        setDeportes(nuevosDeportes);
        console.log("Deporte eliminado exitosamente");//prueba consola
      } else {
        console.error("Error al eliminar el deporte");//prueba consola
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);//prueba consola
    }
  };

  return (
    <div className="tablero">
      <h1>Tablero de Deportes</h1>
      <div className="deportes-container">
        {deportes.map((deporte) => (
          <DeporteTarjeta key={deporte.id} deporte={deporte} onDelete={handleEliminarDeporte} />
        ))}
      </div>
    </div>
  );
};

export default Tablero;


