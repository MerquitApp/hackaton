import {
  GestureRecognizer,
  FilesetResolver
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { GESTURES } from '../constants';
import { isValidGesture } from '../helpers/isValidGesture';
import { areAllValidGestures } from '../helpers/areAllValidGestures';
import { Modal } from './Modal';
import Boton from './Boton';

export const HandsGame = () => {
  const webcamRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const video = webcamRef.current;
    if (!video) return;

    let gesturesList = [];

    let gestureRecognizer;
    let webcamRunning = false;
    let runningMode = 'IMAGE';

    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      );
      gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
          delegate: 'GPU'
        },
        runningMode: runningMode
      });

      if (gestureRecognizer) {
        console.log('GestureRecognizer loaded');
        enableCam();
      }
    };

    createGestureRecognizer();

    function enableCam() {
      if (!gestureRecognizer) {
        alert('Please wait for gestureRecognizer to load');
        return;
      }

      webcamRunning = true;

      // getUsermedia parameters.
      const constraints = {
        video: true
      };

      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        console.log(stream);
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
      });
    }

    let lastVideoTime = -1;
    let results = undefined;
    async function predictWebcam() {
      // Now let's start detecting the stream.
      if (runningMode === 'IMAGE') {
        runningMode = 'VIDEO';
        await gestureRecognizer.setOptions({ runningMode: 'VIDEO' });
      }
      let nowInMs = Date.now();
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
      }

      if (results.gestures.length > 0) {
        const categoryName = results.gestures[0][0].categoryName;
        const handedness = results.handednesses[0][0].displayName;

        if (
          gesturesList[gesturesList.length - 1]?.split(':')[
            gesturesList.length - 1
          ] !== handedness
        ) {
          switch (categoryName) {
            case GESTURES.ClosedFist:
              gesturesList.push(
                `${handedness.toLowerCase()}:${GESTURES.ClosedFist}`
              );
              break;
            case GESTURES.ILoveU:
              gesturesList.push(
                `${handedness.toLowerCase()}:${GESTURES.ILoveU}`
              );
              break;
            case GESTURES.OpenPalm:
              gesturesList.push(
                `${handedness.toLowerCase()}:${GESTURES.OpenPalm}`
              );
              break;
            case GESTURES.PointingUp:
              gesturesList.push(
                `${handedness.toLowerCase()}:${GESTURES.PointingUp}`
              );
              break;
            case GESTURES.ThumbUp:
              gesturesList.push(
                `${handedness.toLowerCase()}:${GESTURES.ThumbUp}`
              );
              break;
          }

          const currIndex = gesturesList.length - 1;
          const isValid = isValidGesture(gesturesList[currIndex], currIndex);
          const areAllValid = areAllValidGestures(gesturesList);
          if (!isValid) {
            // Remove last gesture
            gesturesList.pop();
          }

          if (areAllValid) {
            console.log('Valid gestures');
            setIsCorrect(true);
          }
          console.log(gesturesList);
        }
      }

      if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
      }
    }
  }, []);

  return (
    <>
      <video
        ref={webcamRef}
        className="w-screen h-screen"
        autoPlay
        playsInline
      />
      {isCorrect && (
        <Modal isOpen>
          <div className="p-4">
            <h2 className="text-white">Enhorabuena!</h2>
            <p className="text-white">
              ¡Has completado el juego correctamente!
            </p>
            <Boton url="/">Volver al inicio</Boton>
          </div>
        </Modal>
      )}
    </>
  );
};
