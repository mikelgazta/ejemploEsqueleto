import React, { useState } from 'react';

function Crud() {
  const [peliculas, setPeliculas] = useState([
    'Terminator',
    'Matrix',
    'Gladiator',
    'El gigante de hierro',
  ]);
  const [nuevaPelicula, setNuevaPelicula] = useState('');

  const agregarPelicula = (e) => {
    e.preventDefault(); 
    if (!nuevaPelicula.trim()) return; 
    setPeliculas([...peliculas, nuevaPelicula]);
    setNuevaPelicula(''); 
  };

  const borrarPelicula = (index) => {
    const nuevasPeliculas = peliculas.filter((_, i) => i !== index);
    setPeliculas(nuevasPeliculas);
  };

  return (
    <div className="Ejercicios">
      <h1>Películas Favoritas</h1>
      <form onSubmit={agregarPelicula}>
        <input
          type="text"
          value={nuevaPelicula}
          onChange={(e) => setNuevaPelicula(e)}
        />
        <button type="submit">Agregar</button>
      </form>
      {peliculas.map((pelicula, i) => (
        <div key={i}>
          <p>{pelicula}</p>
          <button onClick={() => borrarPelicula(i)}>Borrar</button>
        </div>
      ))}
    </div>
  );
}

export default Crud;
