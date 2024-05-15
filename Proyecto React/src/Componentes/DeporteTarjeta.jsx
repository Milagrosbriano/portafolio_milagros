import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DeporteTarjeta = ({ deporte, onDelete }) => {
  const navigate = useNavigate();

  const handleVerDetalle = () => {
    navigate(`/detalles/${deporte.id}`);
  };

  const handleEliminar = () => {
    onDelete(deporte.id);
  };

  return (
    <div className="tarjeta">
      <h3>{deporte.title}</h3>
      <button onClick={handleEliminar}>Eliminar</button>
      <button onClick={handleVerDetalle}>Ver</button>
    </div>
  );
};

export default DeporteTarjeta;

