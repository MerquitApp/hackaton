import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Menu from './components/Menu';
import Game from './components/Game';
import Help from './components/Help';
import Ranking from './components/Ranking';
import EndGame from './components/EndGame';

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
    // Set interval to decrement time
    const interval = setInterval(() => {
      setState((prevState) => ({ ...prevState, time: prevState.time - 1 }));
      if (prevState.time === 0) {
        endGame();
      }
    }, 1000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [state.time]);

  const startGame = () => {
    // Reset game state
    setState(INITIAL_STATE);
    // Load puzzles and hints
    // ...
  };

  const solvePuzzle = (index) => {
    // Check if puzzle is correct
    // ...
    // Update game state
    setState((prevState) => ({
      ...prevState,
      solvedPuzzles: [...prevState.solvedPuzzles, index],
      score: prevState.score + 1,
      currentPuzzleIndex: index,
    }));
  };

  const endGame = () => {
    // Calculate final score
    // ...
    // Update game state
    setState((prevState) => ({ ...prevState, gameEnded: true }));
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Menu startGame={startGame} />
        </Route>
        <Route path="/game">
          {!state.gameEnded ? (
            <Game
              puzzles={state.puzzles}
              hints={state.hints}
              currentPuzzleIndex={state.currentPuzzleIndex}
              solvedPuzzle={solvePuzzle}
              time={state.time}
            />
          ) : (
            <EndGame score={state.score} />
          )}
        </Route>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/ranking">
          <Ranking />
        </Route>
      </Switch>
    </Router>
  );
};

export default EscapeRoom;