import React from "react";
import { Link } from "react-router-dom";

const Tarjeta = ({titulo, tareas, onMostrarTarea}) => {
    return (
        <div className="tarjeta">
            <h3>{titulo}</h3>
            {tareas.map((tarea) => (
                <div key={tarea.id}> 
                    <div>{tarea.title}</div>
                    <Link to={`/detalles/${tarea.id}`} onClick={() => onMostrarTarea(tarea.id)}>Ver tarea</Link>
                    
                </div>
            ))}
        </div>
    )
}

export default Tarjeta;
