import {
  GestureRecognizer,
  FilesetResolver
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
import { useEffect } from 'react';
import { useRef } from 'react';
import { GESTURES } from '../constants';
import { validateGestures } from '../helpers/validateGestures';

export const HandsGame = () => {
  const webcamRef = useRef(null);

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
      console.log('predict');

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
        const categoryScore = parseFloat(
          results.gestures[0][0].score * 100
        ).toFixed(2);
        const handedness = results.handednesses[0][0].displayName;

        switch (categoryName) {
          case GESTURES.ClosedFist:
            gesturesList.push(GESTURES.ClosedFist);
            break;
          case GESTURES.ILoveU:
            gesturesList.push(GESTURES.ILoveU);
            break;
          case GESTURES.OpenPalm:
            gesturesList.push(GESTURES.OpenPalm);
            break;
          case GESTURES.PointingUp:
            gesturesList.push(GESTURES.PointingUp);
            break;
          case GESTURES.ThumbUp:
            gesturesList.push(GESTURES.ThumbUp);
            break;
        }

        const areGesturesValid = validateGestures(gesturesList);

        if (areGesturesValid) {
          console.log('Valid gestures');
        } else {
          gesturesList = [];
        }

        console.log(
          `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`
        );
      }

      if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
      }
    }
  }, []);

  return (
    <video ref={webcamRef} className="w-screen h-screen" autoPlay playsInline />
  );
};
