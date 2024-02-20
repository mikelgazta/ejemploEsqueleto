import React, { useState } from 'react';

function Reactividad() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(contador + 1);
  };


  const decrementar = () => {
    setContador(contador - 1);
  };

  return (
    <div className="Ejercicios">
      <h1>Contador: {contador}</h1>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={decrementar}>Decrementar</button>
    </div>
  );
}

export default Reactividad;
