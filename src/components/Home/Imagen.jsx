import React, { useState } from 'react';

import '../../assets/css/Imagen.css'
import UploadButton from '../Elements/UploadButton';

function Imagen() {

    const [imagen, setImagen] = useState(null);

    const seleccionarImagen = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagen(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagen(null);
        }
    };

    const handleLabelKeyDown = (event) => {
        if (event.key === 'Enter') {
            const input = event.target.htmlFor;
            document.getElementById(input).click();
        }
    };

    const cancelarImagen = () => {
        setImagen(null)
    }

    return (
        <div className="row">
            <div className='col d-flex align-items-center justify-content-center'>
                <label
                    htmlFor="image-upload-input"
                    className="image-upload-label"
                    tabIndex="0"
                    onKeyDown={handleLabelKeyDown}
                >
                    {imagen ? (
                        <img src={imagen} alt="Imagen" className="image-preview" />
                    ) : (
                        <span className="file-input-text">Selecciona una imagen</span>
                    )}
                </label>
                <input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={seleccionarImagen}
                    className='input-file'
                />
            </div>
            {imagen && (
                <div className='col'>
                    <div className="botones-container d-flex justify-content-center">
                        <UploadButton imagen={imagen} />
                        <button className='boton btn-cancelar' onClick={cancelarImagen}>Cancelar</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Imagen