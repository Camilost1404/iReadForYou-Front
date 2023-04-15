import React, { useState, useRef } from 'react';

import '../../assets/css/Audio.css'

function Audio(props) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

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

    return (
        <div className="audio-player">
            <div className="audio-player__progress">
                <input
                    type="range"
                    className="audio-player__slider"
                    value={currentTime}
                    max={duration || 0}
                    onChange={handleProgressChange}
                    aria-label="Barra de progreso del audio"
                />
                <div className="audio-player__sound-wave" />
            </div>
            <div className="audio-player__controls">
                <button
                    className="audio-player__button"
                    onClick={handleBackward}
                    aria-label="Atrasar 10 segundos"
                >
                    <i className="fa-solid fa-backward"></i>
                </button>
                <button
                    className="audio-player__button"
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                    {isPlaying ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
                </button>
                <button
                    className="audio-player__button"
                    onClick={handleForward}
                    aria-label="Adelantar 10 segundos"
                >
                    <i className="fa-solid fa-forward"></i>
                </button>
            </div>
            <div className="audio-player__volume">
                <span className="audio-player__volume-icon">
                    <i className="fa-solid fa-volume-high"></i>
                </span>
                <input
                    type="range"
                    className="audio-player__slider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-label="Control de volumen del audio"
                />
            </div>
            <audio
                ref={audioRef}
                src={props.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            >
            </audio>
        </div>
    );
}

export default Audio;
