import React from 'react';
import Camara from './Camara.jsx';
import Imagen from './Imagen.jsx';
// import Preloader from './Preloader';

import '../../assets/css/Home.css'
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className="row align-items-center justify-content-center pt-4 pb-4 px-2 h-100 gap-4">
            <Camara />
            <Imagen />
            {localStorage.getItem('access_token') && (
                <div className="row align-items-center justify-content-center">
                    <Link className='boton btn-action guardar' to='/history'>
                        Audios Guardados
                    </Link>
                </div>
            )
            }
        </div>
    );
}

export default Home