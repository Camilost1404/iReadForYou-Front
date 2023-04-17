import React, { useState, useEffect } from 'react';
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../../assets/css/Login.css"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setEmail(transcript);
    }
  }, [transcript]);

  const handleSpeechRecognition = () => {

    if (listening) {
      // console.log('first')
      SpeechRecognition.stopListening()
      resetTranscript()
    }
    else {
      // console.log('first2')
      resetTranscript()
      SpeechRecognition.startListening({ language: 'es-MX' })
    }

  };

  const manejarCambioEmail = (evento) => {
    setEmail(evento.target.value);
    setErrors(prevState => ({ ...prevState, email: '' }));
  }

  const manejarCambioPassword = (evento) => {
    setPassword(evento.target.value);
    setErrors(prevState => ({ ...prevState, password: '' }));
  }

  const manejarEnvioFormulario = async (event) => {

    event.preventDefault();

    setErrors({})

    if (!email) {

      setErrors(prevState => ({ ...prevState, email: 'El correo electrónico es requerido' }));

    } else if (!/\S+@\S+\.\S+/.test(email)) {

      setErrors({ email: 'El correo electrónico no es válido' });

    }
    if (!password) {

      setErrors(prevState => ({ ...prevState, password: 'La contraseña es requerida' }));

    }

    console.log(Object.keys(errors).length)

    if (email && password) {

      console.log('hola')
      const user = {
        email: email,
        password: password,
      };

      const { data } = await axios.post(`${process.env.REACT_APP_DJANGO_URL}/token/`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      }, { withCredentials: true });

      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
      window.location.href = '/'
    }

  }

  return (
    <div className="contentWrapper row align-items-center justify-content-center pt-4 pb-4 px-2 gap-4 h-100">
      <div className="container">
        <form className='justify-content-center form-container' onSubmit={manejarEnvioFormulario}>
          <h1 className='text-center'>Iniciar sesión</h1>
          <div className="grupo-input">
            <input type="email" placeholder="Correo electrónico" value={email} onChange={manejarCambioEmail} style={{ width: browserSupportsSpeechRecognition ? '80%' : '100%' }} />
            <button type="button" className='btn-micro' onClick={handleSpeechRecognition} style={{ display: browserSupportsSpeechRecognition ? 'block' : 'none' }}>
              {listening ? <i className="fas fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
            </button>
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="grupo-input">
            <input type="password" placeholder="Contraseña" value={password} onChange={manejarCambioPassword} style={{ width: '100%' }} />
            {/* <button type="button" className='btn-micro' onClick={handleSpeechRecognition} style={{ display: browserSupportsSpeechRecognition ? 'block' : 'none' }}>
              {listening ? <i className="fas fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
            </button> */}
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
          <div className='frame'>
            <button className='custom-bttn bttn' type="submit"><span>Acceder</span></button>
          </div>
          <div className="__container">
            <hr />
            {/* <a href="#">Crear una cuenta</a> */}
            {/* <Link className="btn btn-inicio" to="/register">Registro</Link> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login