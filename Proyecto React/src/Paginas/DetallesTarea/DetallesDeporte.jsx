import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MiBoton from "../../Componentes/Boton";
import "../../Componentes/Tarjetas.css";


const DetallesDeporte = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deporte, setDeporte] = useState(null);

  useEffect(() => {
    cargarDeporte(); 
  }, [id]);

  const cargarDeporte = async () => {
    try {
      console.log("ID del deporte:", id); //prueba consola
      const response = await fetch(`http://localhost:3000/api/games`);
      if (response.ok) {
        const data = await response.json();
        const deporteEncontrado = data.find((item) => item.id === id);
        console.log("Datos del deporte:", deporteEncontrado); //prueba consola
        setDeporte(deporteEncontrado); 
      } else {
        console.error("Error al cargar detalles del deporte");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const handleBack = () => {
    navigate('/'); 
  };

  return (
    <div className="detalleDeporte">
      {deporte ? (
        <div>
          <h2>{deporte.title}</h2>
          <p>{deporte.description}</p>
          <p>Players: {deporte.players}</p>
          <p>Categories: {deporte.categories}</p>
          <MiBoton onClick={handleBack} titulo="Atrás" />
        </div>
      ) : (
        <p>Cargando detalles del deporte...</p>
      )}
    </div>
  );
};

export default DetallesDeporte;
