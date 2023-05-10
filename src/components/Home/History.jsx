import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/css/History.css'
import axios from 'axios';
import PreLoader from '../Elements/PreLoader';

const History = () => {

  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioData, setAudioData] = useState([]);

  const navigate = useNavigate();

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


  useEffect(() => {

    if (userId) {
      axios.get(`${process.env.REACT_APP_DJANGO_URL}/ver_audios?id_user=${userId}`)
        .then(response => {
          setAudioData(response.data)
        })
        .catch(error => {
          console.log(error)
        });
    }


  }, [userId])

  const escucharAudio = (id) => {

    setIsLoading(true);

    axios.get(`${process.env.REACT_APP_DJANGO_URL}/audio_especifico?id_audio=${id}`)
      .then(response => {
        const { audio_url, texto } = response.data;

        navigate('/listen_audio', {
          state: { audio_url, texto },
        });
        console.log(response)
      })
      .catch(error => {
        console.error(error)
        setIsLoading(false);
      })

  }

  if (!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className='history-container'>
        {audioData.map((audio) => (
          <div className="card" key={audio.id}>
            <h3>Nombre del audio: <p className='info-card m-4'>{audio.name}</p></h3>
            <h3>Fecha de creación: <p className='info-card m-4'>{new Date(audio.created_at.split('.')[0]).toLocaleDateString()}</p> </h3>
            <div className="button-container">
              <button className='custom-bttn bttn' onClick={() => escucharAudio(audio.id)}>Volver a escuchar</button>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <PreLoader text='Cargando Audio...' />
      )}
    </>

  );
};

export default History;
