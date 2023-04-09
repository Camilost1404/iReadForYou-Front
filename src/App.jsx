import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header.jsx'
import Home from './components/Home/Home.jsx';
import ListenAudio from './components/EscucharAudio/ListenAudio.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="d-flex align-items-center justify-content-center h-100">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/listen_audio" element={<ListenAudio />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
