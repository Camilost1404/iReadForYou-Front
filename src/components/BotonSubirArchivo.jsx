import React, { useState } from 'react';
import axios from "axios";

function BotonSubirArchivo() {

    const [file, setFile] = useState(null)

    const gestionCambioArchivo = async (event) => {

        const imagenSeleccionada = event.target.files[0];

        if (!imagenSeleccionada) {
            alert('Selecciona un archivo')
            return;
        }

        setFile(imagenSeleccionada);

        const formData = new FormData();
        formData.append("image_data", imagenSeleccionada);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DJANGO_URL}/procesar_imagen`,
                formData
            );
            console.log(response);
            alert("Archivo Subido con exito");
        } catch (error) {
            console.log(error);
            alert("Error al subir el archivo");
        }

        event.target.value = null;

    }

    return (
        <div>
            <input type="file" accept=".jpg,.jpeg" onChange={gestionCambioArchivo} />
        </div>
    )
}

export default BotonSubirArchivo