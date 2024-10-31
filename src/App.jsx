import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Puzzle from './components/Puzzle';
import JuegoImagenes from './components/JuegoImagenes';
import { Landing } from './components/Landing';
import { HandsGame } from './components/HandsGame';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/patron" element={<JuegoImagenes />} />
          <Route path="/gestos" element={<HandsGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
