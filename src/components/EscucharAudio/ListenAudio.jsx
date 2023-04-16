import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import '..//../assets/css/ListenAudio.css'
import Audio from "./Audio.jsx"

function ListenAudio(props) {

    const location = useLocation();

    const navigate = useNavigate();
    const [texto, setTexto] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

    useEffect(() => {

        if (!location.state || !location.state.texto || !location.state.audio_url) {
            return navigate("/");
        }

        setTexto(location.state.texto);
        setAudioUrl(location.state.audio_url);

    }, [location.state, navigate]);

    return (
        <div className="row align-items-center justify-content-center pt-4 pb-4 px-2 gap-4">
            <div className="row align-items-center justify-content-center text-container">
                <p>{texto}</p>
            </div>
            <div className="row align-items-center justify-content-center audio-container">
                {audioUrl && (<Audio src={`${process.env.REACT_APP_DJANGO_URL}/${audioUrl}`} />)}
            </div>
        </div>
    );
}

export default ListenAudio;