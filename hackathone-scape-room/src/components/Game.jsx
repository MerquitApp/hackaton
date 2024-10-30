import React, { useState } from 'react';
import Puzzle from './Puzzle';

const Game = ({ puzzles, hints, currentPuzzleIndex, solvedPuzzle, time }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(puzzles[currentPuzzleIndex]);

  const handleSolvePuzzle = (index) => {
    solvedPuzzle(index);
    setCurrentPuzzle({});
  };

  return (
    <div>
      <h1>Tiempo restante: {time} segundos</h1>
      {currentPuzzle && (
        <Puzzle
          puzzle={currentPuzzle}
          hints={hints}
          onSolve={handleSolvePuzzle}
        />
      )}
      {!currentPuzzle && (
        <div>
          <h2>Felicidades, has resuelto el último puzzle!</h2>
          <button onClick={() => solvedPuzzle(currentPuzzleIndex)}>Ver ranking</button>
        </div>
      )}
    </div>
  );
};

export default Game;