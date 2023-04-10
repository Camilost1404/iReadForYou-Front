import React from 'react';
import Camara from './Camara.jsx';
import Imagen from './Imagen.jsx';
// import Preloader from './Preloader';

import '../../assets/css/Home.css'

function Home() {

    return (
        <div className="row align-items-center justify-content-center pt-4 pb-4 h-100">
            <Camara />
            <Imagen />
        </div>
    );
}

export default Home