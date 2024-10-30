import React from 'react';

const EndGame = ({ score }) => {
  return (
    <div>
      <h1>Felicidades, has terminado el juego!</h1>
      <p>Tu puntuación final es {score} puntos.</p>
    </div>
  );
};

export default EndGame;