import React from 'react';

const Menu = ({ startGame }) => {
  return (
    <div>
      <h1>La Casa del Dr. Terror</h1>
      <p>Bienvenido al juego de escape en línea. ¿Estás listo para enfrentar el terror?</p>
      <button onClick={startGame}>Iniciar juego</button>
    </div>
  );
};

export default Menu;