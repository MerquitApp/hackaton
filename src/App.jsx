import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ARGameStart from './components/ARGameStart';
import Puzzle from './components/Puzzle';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ARGameStart />} />
          <Route path="/puzzle" element={<Puzzle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
