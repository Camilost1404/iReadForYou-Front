import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/History.css'

const History = () => {
  const audioData = [
    { audioName: 'audio1', dateCreated: '2022-04-28' },
    { audioName: 'audio2', dateCreated: '2022-04-29' },
    { audioName: 'audio3', dateCreated: '2022-04-30' },
    { audioName: 'audio4', dateCreated: '2022-05-01' },
    { audioName: 'audio5', dateCreated: '2022-05-02' },
  ];

  return (
    <div className='history-container'>
      {audioData.map((audio) => (
        <div className="card" key={audio.audioName}>
          <h3>Nombre del audio: <p className='info-card'>{audio.audioName}</p></h3>
          <h3>Fecha de creación: <p className='info-card'>{audio.dateCreated}</p> </h3>
          <div className="button-container">
            <Link to={`/listen/${audio.audioName}`}>
              <button className='custom-bttn bttn'>Volver a escuchar</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
