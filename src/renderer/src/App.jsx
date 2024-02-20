import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Responsive from './components/Responsive';
import Lista from './components/Lista';
import Reactividad from './components/Reactividad';
import Recarga from './components/Recarga';
import Crud from './components/Crud';

// Genera aquí el componente Navegación
function Navegacion() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Responsive">Responsive</Link>
        </li>
        <li>
          <Link to="/Lista">Lista</Link>
        </li>
        <li>
          <Link to="/Reactividad">Reactividad</Link>
        </li>
        <li>
          <Link to="/Recarga">Recarga</Link>
        </li>
        <li>
          <Link to="/Crud">Crud</Link>
        </li>
      </ul>
    </nav>
  );
}
// Fin componente Navegación

function App() {
  return (
    <Router>
      <div className="Examen">
        {/* Mete este bloque de navegación en un componente */}
        <Navegacion />
        {/* Fin bloque de navegación */}
        <Routes>
          <Route path="/Responsive" element={<Responsive />} />
          <Route path="/Lista" element={<Lista />} />
          <Route path="/Reactividad" element={<Reactividad />} />
          <Route path="/Recarga" element={<Recarga />} />
          <Route path="/Crud" element={<Crud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
