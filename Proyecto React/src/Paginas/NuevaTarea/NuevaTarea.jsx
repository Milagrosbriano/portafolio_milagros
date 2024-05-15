import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevaTarea = ({ onAgregarNuevaTarea }) => {
  const [tarea, setTarea] = useState({
    title: '',
    description: '',
    players: '',
    categories: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea({
      ...tarea,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      });
      if (response.ok) {
        console.log('Tarea agregada exitosamente');//prueba consola
        onAgregarNuevaTarea(tarea);
        navigate('/');
      } else {
        console.error('Error al agregar tarea'); //prueba consola
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);//prueba consola
    }
  };

  return (
    <div className="nuevaTarea">
      <h2>Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titulo:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={tarea.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripcion:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={tarea.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="players">Players:</label>
          <input
            type="text"
            id="players"
            name="players"
            value={tarea.players}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categories">Categories:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={tarea.categories}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NuevaTarea;