import React from 'react';
import Pelicula from './Pelicula';

function Lista() {
  
  const peliculas = [
    'Terminator',
    'Matrix',
    'Gladiator',
    'El gigante de hierro',
  ];

  return (
    <div className="Ejercicios">
      <h1>Películas</h1>
      {}
      {peliculas.map((titulo, index) => (
        <Pelicula key={index} titulo={titulo} />
      ))}
    </div>
  );
}

export default Lista;