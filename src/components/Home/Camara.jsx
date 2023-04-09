import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

import UploadButton from '../Elements/UploadButton';

// Importacion Assets
import imagenCamara from '../../assets/images/camara-fotografica.png';
import '../../assets/css/Camara.css'

function Camara() {

    const [imagen, setImagen] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
    const webcamRef = useRef(null);

    const encenderCamara = () => {
        setImagen(null)
        setCameraOn(true);
    };

    const apagarCamara = () => {
        setCameraOn(false);
    };

    const tomarFoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImagen(imageSrc);
        apagarCamara();
    };

    const tomarDeNuevo = () => {
        encenderCamara();
    };

    const cancelarFoto = () => {
        setImagen(null)
    }

    return (
        <div className='row'>
            {(!cameraOn && !imagen) && (
                <div className="col d-flex align-items-center justify-content-center">
                    <img className='camara-button' src={imagenCamara} alt="Imagen Cámara" onClick={encenderCamara} />
                </div>
            )}
            {cameraOn && (
                <div className="col">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam"
                        />
                        <div className='botones-container d-flex justify-content-center'>
                            <button className='boton btn-action' onClick={tomarFoto}>Tomar Foto</button>
                            <button className='boton btn-cancelar' onClick={apagarCamara}>Cancelar</button>
                        </div>
                </div>
            )}
            {imagen && (
                <div className='col'>
                    <img src={imagen} alt="Foto" />
                    <div className="botones-container d-flex justify-content-center flex-wrap">
                        <button className='boton btn-action' onClick={tomarDeNuevo}>Tomar Nuevamente</button>
                        <UploadButton imagen={imagen} />
                        <button className='boton btn-cancelar' onClick={cancelarFoto}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Camara