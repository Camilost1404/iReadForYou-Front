import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
// import ListenAudio from './components/ListenAudio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/listen_audio" component={ListenAudio} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
