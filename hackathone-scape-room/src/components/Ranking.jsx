import React from 'react';

const Ranking = () => {
  // Mock data for ranking
  const rankingData = [
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 90 },
    { name: 'Player 3', score: 80 },
    { name: 'Player 4', score: 70 },
    { name: 'Player 5', score: 60 },
  ];

  return (
    <div>
      <h1>Ranking de puntuación</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;