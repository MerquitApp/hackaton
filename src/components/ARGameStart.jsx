import { useNavigate } from 'react-router-dom';

function ARGameStart() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/puzzle');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        backgroundImage:
          'url(https://www.marthadebayle.com/wp-content/uploads/2022/03/850x590-13.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', // Cambia el color del texto a blanco
        position: 'relative',
        textAlign: 'center'
      }}>
      {/* Superposición oscura */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1>Rompecabezas de las Sombras Perdidas</h1>
        <button onClick={startGame} style={buttonStyle}>
          Iniciar Juego
        </button>
      </div>
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
