import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PreLoader from './PreLoader';

function UploadButton(props) {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const subirImagen = async () => {

        console.log(props.imagen)
        setIsLoading(true);

        /* const formData = new FormData();
        formData.append("image_data", props.imagen);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DJANGO_URL}/procesar_imagen`,
                formData
            );
            console.log(response);
            setImagen(null)
            navigate({
                pathname: '/listen_audio',
                state: { audio, texto }
            });
        } catch (error) {
            console.log(error);
            alert("Error al subir el archivo");
        } finally {
            setIsLoading(false);
        }*/

        let audioUrl = 'hola'
        let texto='hola'

        setTimeout(() => {
            setIsLoading(false);
            navigate('/listen_audio', {
                state: { audioUrl, texto },
            });
        }, 5000); // Espera 3 segundos antes de finalizar la carga y redirigir

    };

    return (
        <>
            <button className="boton btn-upload" onClick={subirImagen}>
                Subir imagen
            </button>
            {isLoading && (
                <PreLoader />
            )}
        </>
    );
}

export default UploadButton