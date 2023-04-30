import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header.jsx'
import Home from './components/Home/Home.jsx';
import ListenAudio from './components/EscucharAudio/ListenAudio.jsx';
import Login from './components/Auth/login.jsx';
import Register from "./components/Auth/register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid h-100">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/listen_audio" element={<ListenAudio />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
