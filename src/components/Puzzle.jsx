import { useEffect, useRef, useState } from 'react';

// Esta función verifica si una serie de números están en orden ascendente.
// Utiliza un bucle para comparar cada elemento con el anterior.
// Si todos los elementos cumplen la condición, retorna true.
function isRightOrder(...rest) {
  let lastElement = Infinity; // Comenzamos con un valor muy alto
  return rest.every((el) => {
    const isLower = el < lastElement; // Compara cada elemento con el anterior
    lastElement = el; // Actualizamos el último elemento comparado
    return isLower;
  });
}

// Componente principal que maneja el puzzle de orden
const PuzzleGame = () => {
  const confettiRef = useRef(null); // Referencia al efecto de confeti
  const textRef = useRef(null); // Referencia al texto de estado

  // Estado inicial del orden de los elementos
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Función para verificar si el orden de los elementos es correcto
  const checkOrder = () => {
    if (isRightOrder(...order)) {
      // Si el orden es correcto
      textRef.current.innerHTML = '¡Puzzle Completado!'; // Mensaje de éxito
      confettiRef.current.components['particle-system'].startParticles(); // Activamos confeti
    } else {
      textRef.current.innerHTML = 'Sigue intentándolo'; // Mensaje de intento fallido
    }
  };

  // useEffect para verificar el orden cada vez que 'order' cambia
  useEffect(() => {
    checkOrder(); // Llamamos a checkOrder cada vez que 'order' cambia
  }, [order]);

  // Función para manejar el cambio en el orden
  const handleOrderChange = (newOrder) => {
    setOrder(newOrder); // Actualizamos el estado del orden
  };

  // Renderizamos el componente con los elementos necesarios
  return (
    <div>
      {/* Escena con marcadores y piezas de rompecabezas para realidad aumentada */}
      <a-scene arjs="matrixCodeType: 3x3; detectionMode: mono_and_matrix;">
        {/* Marcadores AR (cada marcador representa una pieza del puzzle) */}
        {Array.from({ length: 9 }, (_, index) => (
          <a-marker
            key={index}
            type="pattern"
            url={`/pattern-pumpkin (${index + 1}).patt`}
            id={`marker-${index + 1}`}>
            <a-entity
              position="0 0 0"
              scale="1"
              onClick={() =>
                handleOrderChange([
                  /* nuevo orden aquí */
                ])
              }>
              {/* Aquí se puede agregar un elemento de la pieza de rompecabezas */}
              {/* <a-entity position="0 0 0" scale="1" gltf-model="/character_puzzle_piece.gltf"></a-entity> */}
            </a-entity>
          </a-marker>
        ))}
        <a-entity camera look-controls position="0 0 0"></a-entity>
      </a-scene>

      {/* Texto que muestra mensajes de éxito o error */}
      {/*<span ref={textRef} className="text-white bg-black p-1 text-2xl absolute bottom-0 left-0">Tu tarea es arrastrar y unir los pedazos para formar la imagen original</span>*/}
      {/* Efecto de confeti en caso de éxito */}
      <a-entity
        ref={confettiRef}
        particle-system="preset: confetti; enabled: false; particleCount: 1000; color: #FA4B3C, #FF9F1C, #FDFF00, #0FFF50, #00AFFF, #6A4BFF, #FC00FF, #FF0D00; velocityValue: 3;"></a-entity>
    </div>
  );
};

export default PuzzleGame; // Exportamos el componente para que pueda usarse en otros archivos
