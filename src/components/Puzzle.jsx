import { useEffect, useRef } from 'react';

let hasLoaded = false;

// Componente principal que maneja el puzzle de orden
const PuzzleGame = () => {
  const confettiRef = useRef(null); // Referencia al efecto de confeti
  const textRef = useRef(null); // Referencia al texto de estado

  // useEffect para llamar a checkOrder solo al montar el componente
  useEffect(() => {
    if (hasLoaded) return;
    hasLoaded = true;

    const markers = [];

    for (let j = 0; j < 8; j++) {
      const row = [];
      if (j === 8 || (j % 3 === 0 && j !== 0)) {
        markers.push(row);
      } else {
        row.push(document.querySelector(`#marker-${j}`));
      }
    }

    console.log(markers);

    // eslint-disable-next-line no-undef
    AFRAME.registerComponent('scene', {
      tick: () => {}
    });
  }, []);

  // Renderizado del componente
  return (
    <div>
      {/* Escena de AR con marcadores que representan las piezas del puzzle */}
      <a-scene arjs="matrixCodeType: 3x3; detectionMode: mono_and_matrix;">
        {/* Generamos los marcadores para cada pieza del puzzle */}
        <a-marker type="pattern" url={`/pattern-pumpkin1.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/candleBundle.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin2.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/candyA.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin3.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/character_jack.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin4.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/lampPost.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin5.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/lollipopB.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin6.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/shrine.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin7.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/treeA_graveyard.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin8.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/character_witch.gltf"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker type="pattern" url={`/pattern-pumpkin9.patt`}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/pumpkinLarge.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        {/* Cámara AR para interacción en la escena */}
        <a-entity camera look-controls position="0 0 0"></a-entity>
      </a-scene>

      {/* Mensaje que muestra el estado del puzzle */}
      <span
        ref={textRef}
        className="text-white bg-black p-1 text-2xl absolute bottom-0 left-0">
        Tu tarea es arrastrar y unir los pedazos para formar la imagen original
      </span>

      {/* Efecto de confeti en caso de éxito */}
      <a-entity
        ref={confettiRef}
        particle-system="preset: confetti; enabled: false; particleCount: 1000; color: #FA4B3C, #FF9F1C, #FDFF00, #0FFF50, #00AFFF, #6A4BFF, #FC00FF, #FF0D00; velocityValue: 3;"></a-entity>
    </div>
  );
};

export default PuzzleGame; // Exportamos el componente para que pueda usarse en otros archivos.
