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

        const formData = new FormData();
        const imagen = props.imagen.split(',')[1];

        formData.append("image_data", imagen);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DJANGO_URL}/procesar_imagen`,
                formData
            );

            const { audio_url, texto } = response.data;

            console.log(response);
            console.log(audio_url);
            console.log(texto)

            setIsLoading(false);

            navigate('/listen_audio', {
                state: { audio_url, texto },
            });

        } catch (error) {
            console.log(error);
            alert("Error al subir el archivo");
            setIsLoading(false);
        }

        // let audioUrl = 'hola'
        // let texto='hola'

        /* setTimeout(() => {
            setIsLoading(false);
            navigate('/listen_audio', {
                state: { audioUrl, texto },
            });
        }, 5000); // Espera 3 segundos antes de finalizar la carga y redirigir */

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