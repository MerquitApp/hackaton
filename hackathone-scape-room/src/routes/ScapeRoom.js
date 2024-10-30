import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Menu from '../components/Menu';
import Game from '../components/Game';
import Help from '../components/Help';
import Ranking from '../components/Ranking';
import EndGame from '../components/EndGame';

// Constants
const MAX_TIME = 60 * 60; // 1 hour
const INITIAL_STATE = {
  time: MAX_TIME,
  puzzles: [],
  hints: [],
  score: 0,
  solvedPuzzles: [],
  currentPuzzleIndex: 0,
  gameEnded: false,
};

const EscapeRoom = () => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prevState) => ({ ...prevState, time: prevState.time - 1 }));
      if (state.time === 0) {
        endGame();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.time]);

  const startGame = () => {
    setState(INITIAL_STATE);
    // Load puzzles and hints
    // ...
  };

  const solvePuzzle = (index) => {
    setState((prevState) => ({
      ...prevState,
      solvedPuzzles: [...prevState.solvedPuzzles, index],
      score: prevState.score + 1,
      currentPuzzleIndex: index,
    }));
  };

  const endGame = () => {
    setState((prevState) => ({ ...prevState, gameEnded: true }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu startGame={startGame} />} />
        <Route
          path="/game"
          element={
            !state.gameEnded ? (
              <Game
                puzzles={state.puzzles}
                hints={state.hints}
                currentPuzzleIndex={state.currentPuzzleIndex}
                solvedPuzzle={solvePuzzle}
                time={state.time}
              />
            ) : (
              <EndGame score={state.score} />
            )
          }
        />
        <Route path="../help" element={<Help />} />
        <Route path="../ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
};

export default EscapeRoom;
