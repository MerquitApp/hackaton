import { useEffect, useRef } from 'react';
import isRightOrder from '../helpers/isRightOrder';

let hasLoaded = false;

const GestureGame = () => {
  const confettiRef = useRef(null);

  // Referencias a los marcadores
  const firstMarkerRef = useRef(null);
  const secondMarkerRef = useRef(null);
  const thirdMarkerRef = useRef(null);
  const fourthMarkerRef = useRef(null);

  useEffect(() => {
    if (hasLoaded) return;
    hasLoaded = true;

    // eslint-disable-next-line no-undef
    AFRAME.registerComponent('scene', {
      tick: () => {
        const obj1Pos = firstMarkerRef.current.object3D.position;
        const obj2Pos = secondMarkerRef.current.object3D.position;
        const obj3Pos = thirdMarkerRef.current.object3D.position;
        const obj4Pos = fourthMarkerRef.current.object3D.position;

        const isValidOrder = isRightOrder(
          obj1Pos.x,
          obj2Pos.x,
          obj3Pos.x,
          obj4Pos.x
        );

        if (isValidOrder) {
          confettiRef.current.components['particle-system'].startParticles();
        }
      }
    });
  }, []);

  return (
    <a-scene arjs="matrixCodeType: 3x3; detectionMode: mono_and_matrix;" scene>
      {/* Markers and Entities */}
      <a-marker type="barcode" value="0" ref={firstMarkerRef} id="first-marker">
        <a-entity position="0 0 0" scale="1">
          <a-entity
            position="0 0 0"
            scale="1"
            gltf-model="/GLTF/character_witch.gltf"></a-entity>
        </a-entity>
      </a-marker>
      <a-marker
        type="barcode"
        value="1"
        ref={secondMarkerRef}
        id="second-marker">
        <a-entity position="0 0 0" scale="1">
          <a-entity
            position="0 0 0"
            scale="1"
            gltf-model="/GLTF/candleSmall.gltf.glb"></a-entity>
        </a-entity>
      </a-marker>
      <a-marker type="barcode" value="2" ref={thirdMarkerRef} id="third-marker">
        <a-entity position="0 0 0" scale="1">
          <a-entity
            position="0 0 0"
            scale="1"
            gltf-model="/GLTF/candyA.gltf.glb"></a-entity>
        </a-entity>
      </a-marker>
      <a-marker
        type="barcode"
        value="3"
        ref={fourthMarkerRef}
        id="fourth-marker">
        <a-entity position="0 0 0" scale="1">
          <a-entity
            position="0 0 0"
            scale="1"
            gltf-model="/GLTF/cauldron.gltf.glb"></a-entity>
        </a-entity>
      </a-marker>
      <a-entity
        ref={confettiRef}
        position="0 2.25 -15"
        particle-system="color: #EF0000,#44CC00; particleCount: 1000; enabled: false; duration: 2"></a-entity>
      <a-entity camera look-controls position="0 0 0"></a-entity>
    </a-scene>
  );
};

export default GestureGame;
