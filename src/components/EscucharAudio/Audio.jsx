import React, { useState, useRef } from 'react';
import axios from 'axios';

import '../../assets/css/Audio.css'

function Audio(props) {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [tonalidad, setTonalidad] = useState(0);

    const [disabled, setDisabled] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        audioRef.current.volume = event.target.value;
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleProgressChange = (event) => {
        audioRef.current.currentTime = event.target.value;
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleBackward = () => {
        audioRef.current.currentTime -= 10;
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleForward = () => {
        audioRef.current.currentTime += 10;
        setCurrentTime(audioRef.current.currentTime);
    };

    const ActiveVolume = () => {

        if (audioRef.current.volume === 0) {
            audioRef.current.volume = 1
            setVolume(1)
        } else {
            audioRef.current.volume = 0
            setVolume(0)
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const subirTonalidad = async () => {

        const nuevaTonalidad = tonalidad + 1;

        const formData = new FormData();

        const nombre_audio = props.src.split('/')[3]

        setDisabled(true);

        formData.append("data_audio", nombre_audio);
        formData.append("tono", 'grave');

        // console.log(formData)

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DJANGO_URL}/cambiar_tono`,
                formData
            );
            setTonalidad(nuevaTonalidad);
            console.log(response);

            setDisabled(true);
            setTimeout(() => {
                setDisabled(false);
            }, 800);

        } catch (error) {
            console.log(error);
            alert("Error al cambiar tonalidad");
        }

    }

    const bajarTonalidad = async () => {

        const nuevaTonalidad = tonalidad - 1;

        const formData = new FormData();

        const nombre_audio = props.src.split('/')[3]

        setDisabled(true);

        formData.append("data_audio", nombre_audio);
        formData.append("tono", 'agudo');

        // console.log(formData)

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DJANGO_URL}/cambiar_tono`,
                formData
            );

            setDisabled(true);
            setTimeout(() => {
                setDisabled(false);
            }, 800);

            setTonalidad(nuevaTonalidad);
            console.log(response);

        } catch (error) {
            console.log(error);
            alert(error);
        }

    }

    return (
        <div className="audio-player">
            <div className="audio-progress">
                <input
                    type="range"
                    className="audio-progress-bar"
                    min="0"
                    max={Math.floor(duration) || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                />
                <span className="audio-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="audio-player__controls">
                <button
                    className="audio-player__button"
                    onClick={handleBackward}
                    aria-label="Atrasar 10 segundos"
                    title='Atrasar 10 segundos'
                >
                    <i className="fa-solid fa-backward"></i>
                </button>
                <button
                    className="audio-player__button"
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Reproducir" : "Pausar"}
                    title={isPlaying ? "Reproducir" : "Pausar"}
                >
                    {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                </button>
                <button
                    className="audio-player__button"
                    onClick={handleForward}
                    aria-label="Adelantar 10 segundos"
                    title="Adelantar 10 segundos"
                >
                    <i className="fa-solid fa-forward"></i>
                </button>
            </div>
            <div className="audio">
                <div className="audio-volume">
                    <button
                        className="audio-button"
                        onClick={ActiveVolume}
                        title={volume === 0 ? "Activar sonido" : "Silenciar"}
                    >
                        {volume > 0.5 ? (
                            <i className="fas fa-volume-up"></i>
                        ) : volume > 0 & volume < 0.5 ? (
                            <i className="fas fa-volume-down"></i>
                        ) : (
                            <i className="fas fa-volume-mute"></i>
                        )}
                    </button>
                    <input
                        type="range"
                        className="audio-volume-bar"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
                <div>
                    <button className="tonalidad-button"
                        onClick={bajarTonalidad}
                        disabled={tonalidad === -3 || disabled}
                        title='Bajar Tonailidad'
                        aria-label='Bajar Tonailidad'
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <span className="tonalidad-text">{tonalidad}</span>
                    <button className="tonalidad-button"
                        onClick={subirTonalidad}
                        disabled={tonalidad === 3 || disabled}
                        title='Subir Tonailidad'
                        aria-label='Subir Tonailidad'
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <audio
                key={tonalidad}
                ref={audioRef}
                src={`${process.env.REACT_APP_DJANGO_URL}${props.src}`}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            >
            </audio>
        </div>
    );
}

export default Audio;
