import React from 'react';

const Puzzle = ({ puzzle, hints, onSolve }) => {
  return (
    <div>
      <h2>{puzzle.title}</h2>
      <p>{puzzle.description}</p>
      <div>
        {puzzle.options.map((option, index) => (
          <button key={index} onClick={() => onSolve(index)}>
            {option}
          </button>
        ))}
      </div>
      {hints.length > 0 && (
        <div>
          <h3>Pistas:</h3>
          {hints.map((hint, index) => (
            <p key={index}>{hint}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Puzzle;