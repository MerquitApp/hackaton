import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Imagen = () => {
  const [Instrucciones, setInstrucciones] = useState(false);
  const [AcercaDe, setAcercaDe] = useState(false);
  const navigate = useNavigate();

  const handleInstrucciones = () => {
    setInstrucciones(true);
    setAcercaDe(false);
  };

  const handleAcercaDe = () => {
    setAcercaDe(true);
    setInstrucciones(false);
  };

  const handleJugar = () => {
    setInstrucciones(false);
    setAcercaDe(false);
    navigate('/juego');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4 bg-[url('./media/background-image.webp')] bg-cover bg-center pt-10">
      <h2 className="text-center text-4xl font-bold text-orange-600 uppercase">
        Bienvenido al juego de adivinar palabras
      </h2>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg w-40 hover:bg-blue-700"
          onClick={handleInstrucciones}>
          Instrucciones
        </button>
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg w-40 hover:bg-blue-700"
          onClick={handleJugar}>
          Jugar
        </button>
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg w-40 hover:bg-blue-700"
          onClick={handleAcercaDe}>
          Acerca de
        </button>
      </div>
      {Instrucciones && (
        <div className="flex flex-col items-center justify-center w-4/5 mt-4 p-4 bg-slate-500 rounded-lg">
          <p className="text-center text-xl text-white">
            Este juego consiste en adivinar una palabra de 15 letras. Para hacer
            la adivinanza, debes escribir la palabra en el cuadro de texto y
            luego pulsar el botón de verificación. Si la palabra es correcta, se
            mostrará un mensaje de éxito y se le dará una recompensa. Si la
            palabra es incorrecta, se mostrará un mensaje de error y se le dará
            una recompensa.
          </p>
        </div>
      )}
      {AcercaDe && (
        <div className="flex flex-col items-center justify-center w-4/5 mt-4 p-4 bg-slate-500 rounded-lg">
          <p className="text-center text-xl text-white">
            Descubre otros juegos de adivinanzas en nuestro sitio web y aprende
            más sobre el mundo del videojuego.
          </p>
        </div>
      )}
    </div>
  );
};

export default Imagen;
