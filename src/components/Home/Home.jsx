import React from 'react';
import Camara from './Camara.jsx';
import Imagen from './Imagen.jsx';
// import Preloader from './Preloader';

import '../../assets/css/Home.css'

function Home() {

    return (
        <div className="container">
            <div className="row row-gap-5">
                <div className="col-md-6">
                    <Camara />
                </div>
                <div className="col-md-6">
                    <Imagen />
                </div>
            </div>
        </div>
    );
}

export default Home