import React from 'react';
import { useNavigate } from 'react-router-dom';


const Menu = ({ startGame }) => {

  const navigate = useNavigate();

  const handleStartGame = () => {
    startGame();
    navigate('/game'); // Redirige a la página del juego
  };


  return (
    <div>
      <h1>La Casa del Dr. Terror</h1>
      <p>Bienvenido al juego de escape en línea. ¿Estás listo para enfrentar el terror?</p>
      <button onClick={handleStartGame}>Iniciar juego</button>
    </div>
  );
};

export default Menu;