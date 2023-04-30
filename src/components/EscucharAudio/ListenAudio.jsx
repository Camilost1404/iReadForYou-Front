import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import '..//../assets/css/ListenAudio.css'
import Audio from "./Audio.jsx"
import axios from "axios";

function ListenAudio(props) {

    const location = useLocation();

    const navigate = useNavigate();
    const [texto, setTexto] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

    const [userId, setUserId] = useState(null);
    const [audioName, setAudioName] = useState("");
    const [save, setSave] = useState(false)

    useEffect(() => {

        if (!location.state || !location.state.texto || !location.state.audio_url) {
            return navigate("/");
        }

        setTexto(location.state.texto);
        setAudioUrl(location.state.audio_url);

    }, [location.state, navigate]);

    useEffect(() => {

        if (localStorage.getItem('access_token')) {

            axios.get(`${process.env.REACT_APP_DJANGO_URL}/user/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }, { withCredentials: true })
                .then(response => {

                    let user = response.data.user[0]
                    setUserId(user.id)

                })
                .catch(error => {
                    console.log(error)
                });
        }

    }, [])

    const handleSaveAudio = () => {
        setSave(true)
    }

    const cancelSaveAudio = () => {
        setAudioName("")
        setSave(false)
    }

    const guardarAudio = async () => {

        try {

            // Petición

            const nombre_audio = audioUrl.split('/')[3]
            const formData = new FormData();

            formData.append("audio", nombre_audio);
            formData.append("name", audioName);
            formData.append("id_user", userId);

            let response = await axios.post(`${process.env.REACT_APP_DJANGO_URL}/guardar_audio`, formData)

            console.log(response)
            setAudioName("")
            setSave(false)
            alert('Audio guardado con éxito')

        } catch (error) {
            setAudioName("")
            setSave(false)
            alert('Error al guardar el audio')
        }



    }

    return (
        <div className="row align-items-center justify-content-center pt-4 pb-4 px-2 gap-4">
            <div className="row align-items-center justify-content-center text-container">
                <p>{texto}</p>
            </div>

            {localStorage.getItem('access_token') && (
                <div className="row align-items-center justify-content-center">
                    {save ? (
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <label htmlFor="nombre-audio">
                                Nombre para el Audio:
                                <input
                                    value={audioName}
                                    type="text"
                                    aria-label="Digita el nombre del audio"
                                    className="mx-3"
                                    onChange={(e) => setAudioName(e.target.value)}
                                    name="nombre-audio" />
                            </label>
                            <div className='botones-container d-flex justify-content-center'>
                                <button className='boton btn-action' onClick={guardarAudio}>Guardar</button>
                                <button className='boton btn-cancelar' onClick={cancelSaveAudio}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button className='col-sm-3 boton btn-action' onClick={handleSaveAudio}>Guardar Audio</button>
                    )}
                </div>
            )}

            <div className="row align-items-center justify-content-center audio-container gap-5">
                {audioUrl && (<Audio src={`${audioUrl}`} />)}
            </div>
        </div>
    );
}

export default ListenAudio;