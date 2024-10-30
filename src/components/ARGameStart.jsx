import { useState } from 'react';
import { Canvas } from '@react-three/fiber';

function ARGameStart() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {!isGameStarted ? (
        <div>
          <h1>Juego de Puzzles en Realidad Aumentada</h1>
          <button onClick={startGame} style={buttonStyle}>
            Iniciar Juego
          </button>
        </div>
      ) : (
        <div>
          <h2>Apunta tu cámara a un marcador AR</h2>
          <Canvas style={{ width: '100%', height: '400px' }}>
            <a-scene embedded arjs="sourceType: webcam;">
              {/* Piezas del puzzle AR */}
              <a-box position="0 0.5 -1" material="color: red"></a-box>
              <a-sphere
                position="1 0.5 -3"
                radius="0.5"
                material="color: green"></a-sphere>
              <a-cylinder
                position="0 0.5 -3"
                radius="0.3"
                material="color: blue"></a-cylinder>
            </a-scene>
          </Canvas>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer'
};

export default ARGameStart;
