import React from 'react';
import Camara from './Camara.jsx';
import Imagen from './Imagen.jsx';
import History from './History.jsx';
// import Preloader from './Preloader';

import '../../assets/css/Home.css'

function Home() {

    return (
        <div className="row align-items-center justify-content-center pt-4 pb-4 px-2 h-100 gap-4">
            <Camara />
            <Imagen />
        
        </div>
    );
}

export default Home