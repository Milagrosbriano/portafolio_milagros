import React from "react";

const Tarea = ({ tarea }) => {
  return (
    <div className="tareasContainer">
      <p>{tarea.id}</p>
      <p>{tarea.title}</p>
      <p>{tarea.description}</p>
      <p>{tarea.players}</p>
      <p>{tarea.categorias}</p>
    </div>
  );
};

export default Tarea;