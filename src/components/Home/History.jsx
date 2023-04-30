import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../assets/css/History.css'
import axios from 'axios';

const History = () => {

  const [userId, setUserId] = useState(null);
  const [audioData, setAudioData] = useState([]);

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

  if (!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className='history-container'>
      {audioData.map((audio) => (
        <div className="card" key={audio.id}>
          <h3>Nombre del audio: <p className='info-card m-4'>{audio.name}</p></h3>
          <h3>Fecha de creación: <p className='info-card m-4'>{new Date(audio.created_at.split('.')[0]).toLocaleDateString()}</p> </h3>
          <div className="button-container">
            <Link to={`/`}>
              <button className='custom-bttn bttn'>Volver a escuchar</button>
            </Link>
          </div>
        </div>
      ))}
    </div>

  );
};

export default History;
