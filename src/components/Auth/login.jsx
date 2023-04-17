import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../../assets/css/Login.css"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
  }

  const manejarCambioPassword = (evento) => {
    setPassword(evento.target.value);
  }

  const manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    console.log('hola')
    // fetch('http://ejemplo.com/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));
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
          <div className="grupo-input">
            <input type="password" placeholder="Contraseña" value={password} onChange={manejarCambioPassword} style={{ width: '100%' } } />
            {/* <button type="button" className='btn-micro' onClick={handleSpeechRecognition} style={{ display: browserSupportsSpeechRecognition ? 'block' : 'none' }}>
              {listening ? <i className="fas fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
            </button> */}
          </div>
          <div className='frame'>
            <button className='custom-bttn bttn' type="submit"><span>Acceder</span></button>
          </div>
          <div className="__container">
            <hr />
            <a href="#">Crear una cuenta</a>
            {/* <Link className="btn btn-inicio" to="/register">Registro</Link> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login