import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GestureGame from './components/JuegoImagenes';
import Imagen from './components/Imagen';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Imagen />} />
          <Route path="/juego" element={<GestureGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
