import { useEffect, useRef, useState } from 'react';
import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
import isRightOrder from '../helpers/isRightOrder';

const GestureGame = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const confettiRef = useRef(null);
    const textRef = useRef(null);
    const enableWebcamButtonRef = useRef(null);
    const [gestureRecognizer, setGestureRecognizer] = useState(null);
    const [webcamRunning, setWebcamRunning] = useState(false);
    const [runningMode, setRunningMode] = useState('IMAGE');

    // Referencias a los marcadores
    const firstMarkerRef = useRef(null);
    const secondMarkerRef = useRef(null);
    const thirdMarkerRef = useRef(null);
    const fourthMarkerRef = useRef(null);

    let lastVideoTime = -1;
    let results = undefined;

    useEffect(() => {
        const createGestureRecognizer = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
            );
            const recognizer = await GestureRecognizer.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                    delegate: "GPU"
                },
                runningMode: runningMode
            });
            setGestureRecognizer(recognizer);
        };
        createGestureRecognizer();
    }, [runningMode]);

    const enableCam = () => {
        if (!gestureRecognizer) {
            alert("Please wait for gestureRecognizer to load");
            return;
        }

        setWebcamRunning(!webcamRunning);
        enableWebcamButtonRef.current.innerText = webcamRunning
            ? "ENABLE PREDICTIONS"
            : "DISABLE PREDICTIONS";

        const constraints = {
            video: true
        };

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener("loadeddata", predictWebcam);
        });
    };

    const predictWebcam = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        const drawingUtils = new DrawingUtils(canvasCtx);

        if (runningMode === "IMAGE") {
            setRunningMode("VIDEO");
            await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
        }

        const nowInMs = Date.now();
        if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime;
            results = gestureRecognizer.recognizeForVideo(video, nowInMs);
        }

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.landmarks) {
            for (const landmarks of results.landmarks) {
                drawingUtils.drawConnectors(
                    landmarks,
                    GestureRecognizer.HAND_CONNECTIONS,
                    { color: "#00FF00", lineWidth: 5 }
                );
                drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
            }
        }
        canvasCtx.restore();

        if (results.gestures.length > 0) {
            // Obtener posiciones de los marcadores
            const obj1Pos = firstMarkerRef.current.object3D.position;
            const obj2Pos = secondMarkerRef.current.object3D.position;
            const obj3Pos = thirdMarkerRef.current.object3D.position;
            const obj4Pos = fourthMarkerRef.current.object3D.position;            

            const isValidOrder = isRightOrder(obj1Pos.x, obj2Pos.x, obj3Pos.x, obj4Pos.x);
          
            if (isValidOrder) {
                confettiRef.current.components["particle-system"].startParticles();
            } else {
                console.log("MAL :(");
            }
        }

        if (webcamRunning) {
            window.requestAnimationFrame(predictWebcam);
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline className="absolute bottom-0 h-[150px] hidden"></video>
            <canvas
                className="absolute left-0 top-0"
                ref={canvasRef}
                width="1280"
                height="720"
                id='output_canvas'
            ></canvas>
            <button
                ref={enableWebcamButtonRef}
                onClick={enableCam}
                id="btn-enable-webcam"
                className="absolute cursor-pointer z-100 top-0 left-0"
            >
                Enable Gestures
            </button>
            <a-scene arjs="matrixCodeType: 3x3; detectionMode: mono_and_matrix;">
                {/* Markers and Entities */}
                <a-marker type='barcode' value='0' ref={firstMarkerRef} id="first-marker">
                    <a-entity position="0 0 0" scale="1">
                        <a-entity
                            position="0 0 0"
                            scale="1"
                            gltf-model="/GLTF/character_witch.gltf">
                        </a-entity>
                    </a-entity>
                </a-marker>
                <a-marker type='barcode' value='1' ref={secondMarkerRef} id="second-marker">
                    <a-entity position="0 0 0" scale="1">
                        <a-entity
                            position="0 0 0"
                            scale="1"
                            gltf-model="/GLTF/candleSmall.gltf.glb">
                        </a-entity>
                    </a-entity>
                </a-marker>
                <a-marker type='barcode' value='2' ref={thirdMarkerRef} id="third-marker">
                    <a-entity position="0 0 0" scale="1">
                        <a-entity
                            position="0 0 0"
                            scale="1"
                            gltf-model="/GLTF/candyA.gltf.glb">
                        </a-entity>
                    </a-entity>
                </a-marker>
                <a-marker type='barcode' value='3' ref={fourthMarkerRef} id="fourth-marker">
                    <a-entity position="0 0 0" scale="1">
                        <a-entity
                            position="0 0 0"
                            scale="1"
                            gltf-model="/GLTF/cauldron.gltf.glb">
                        </a-entity>
                    </a-entity>
                </a-marker>
                <a-entity ref={confettiRef} particle-system="preset: confetti; particleCount: 100; color: #ffa500"></a-entity>
                <a-entity camera look-controls position="0 0 0"></a-entity>
            </a-scene>
            <span ref={textRef} className="text-white bg-black p-1 text-2xl absolute bottom-0 left-0">Enseñame los cubos</span>
        </div>
    );
};

export default GestureGame;