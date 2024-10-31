import { useEffect, useRef, useState } from 'react';
import isRightOrder from '../helpers/isRightOrder';
import Modal from '../components/Modal';

let hasLoaded = false;

// Componente principal que maneja el puzzle de orden
const PuzzleGame = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const confettiRef = useRef(null); // Referencia al efecto de confeti
  const markerRef1 = useRef(null);
  const markerRef2 = useRef(null);
  const markerRef3 = useRef(null);
  const markerRef4 = useRef(null);
  const markerRef5 = useRef(null);
  const markerRef6 = useRef(null);
  const markerRef7 = useRef(null);
  const markerRef8 = useRef(null);
  const markerRef9 = useRef(null);

  // useEffect para llamar a checkOrder solo al montar el componente
  useEffect(() => {
    if (hasLoaded) return;
    hasLoaded = true;

    // eslint-disable-next-line no-undef
    AFRAME.registerComponent('scene', {
      tick: () => {
        const markers = [
          [markerRef1.current, markerRef2.current, markerRef3.current],
          [markerRef4.current, markerRef5.current, markerRef6.current],
          [markerRef7.current, markerRef8.current, markerRef9.current]
        ];

        const areRowsValid = markers.every(
          (row) =>
            !isRightOrder(...row.map((el) => el.object3D.position.x)) &&
            row.some((el) => el.object3D.position.x !== 0)
        );

        const isFirstColumnValid = !isRightOrder(
          markers[0][0].object3D.position.y,
          markers[1][0].object3D.position.y,
          markers[2][0].object3D.position.y
        );

        if (areRowsValid && isFirstColumnValid) {
          confettiRef.current.components['particle-system'].startParticles();
          setIsCorrect(true);
        }
      }
    });
  }, []);

  // Renderizado del componente
  return (
    <div>
      {/* Escena de AR con marcadores que representan las piezas del puzzle */}
      <a-scene
        arjs="matrixCodeType: 3x3; detectionMode: mono_and_matrix;"
        scene>
        {/* Generamos los marcadores para cada pieza del puzzle */}
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin1.patt`}
          ref={markerRef1}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/candleBundle.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin2.patt`}
          ref={markerRef2}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/candyA.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin3.patt`}
          ref={markerRef3}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/character_jack.gltf"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin4.patt`}
          ref={markerRef4}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/lampPost.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin5.patt`}
          ref={markerRef5}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/lollipopB.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin6.patt`}
          ref={markerRef6}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/shrine.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin7.patt`}
          ref={markerRef7}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/treeA_graveyard.gltf.glb"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin8.patt`}
          ref={markerRef8}>
          <a-entity position="0 0 0" scale="1">
            {/* Render de cada pieza del puzzle */}
            <a-entity
              position="0 0 0"
              scale="1"
              gltf-model="/character_witch.gltf"></a-entity>
          </a-entity>
        </a-marker>
        <a-marker
          type="pattern"
          url={`/pattern-pumpkin9.patt`}
          ref={markerRef9}>
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
        {/* Efecto de confeti en caso de éxito */}
        <a-entity
          ref={confettiRef}
          particle-system="preset: confetti; enabled: false; particleCount: 1000; color: #FA4B3C, #FF9F1C, #FDFF00, #0FFF50, #00AFFF, #6A4BFF, #FC00FF, #FF0D00; velocityValue: 3;"></a-entity>
      </a-scene>
      {isCorrect && <Modal isOpen>Correct</Modal>}
    </div>
  );
};

export default PuzzleGame; // Exportamos el componente para que pueda usarse en otros archivos.
