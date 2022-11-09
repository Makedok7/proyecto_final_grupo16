import Home from './components/Home.js';
import Juego from './components/Juego.js';
import Desarrolladores from './components/Desarrolladores.js';
import Error from './components/Error.js';
import PiedraPapelTijeras from './components/PiedraPapelTijeras.js';
import Ahorcadito from './components/Ahorcadito.js';
import Arkanoid from './components/Arkanoid/Juego.js';
import PhaserGame from './components/Phaser/Juego.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />;
        <Route path='/juego' element={<Juego />} />;
        <Route path='/desarrolladores' element={<Desarrolladores />} />;
        <Route path='*' element={<Error />} />;
        <Route path='/piedraPapelTijeras' element={<PiedraPapelTijeras />} />;
        <Route path='/ahorcadito' element={<Ahorcadito />} />;
        <Route path='/arkanoid' element={<Arkanoid />} />;
        <Route path='/phaserGame' element={<PhaserGame />} />;
      </Routes>
    </Router>
  );
}
