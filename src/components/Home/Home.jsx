import React from 'react';
import Camara from './Camara.jsx';
import Imagen from './Imagen.jsx';
// import Preloader from './Preloader';

import '../../assets/css/Home.css'

function Home() {

    return (
        <div className="home">
            <div className='title-container'>
                <h1 className='titulo'>I Read For You</h1>
            </div>
            <div className="buttons">
                <Camara />
                <Imagen />
            </div>
        </div>
    );
}

export default Home