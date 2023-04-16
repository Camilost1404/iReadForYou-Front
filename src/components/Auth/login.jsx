import React from 'react';
import "../../assets/css/Login.css"
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  manejarCambioEmail = (evento) => {
    this.setState({ email: evento.target.value });
  }

  manejarCambioPassword = (evento) => {
    this.setState({ password: evento.target.value });
  }

  manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    fetch('http://ejemplo.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="contentWrapper">
        <div className="container">
          <form className='justify-content-center form-container' onSubmit={this.manejarEnvioFormulario}>
            <h1 className='text-center'>Iniciar sesión</h1>
            <input type="email" placeholder="Correo electrónico" value={this.state.email} onChange={this.manejarCambioEmail} />
            <input type="password" placeholder="Contraseña" value={this.state.password} onChange={this.manejarCambioPassword} />
            <div className='frame'>
            <button className='custom-bttn bttn' type="submit"><span>Acceder</span></button>
            </div>
            <div className="__container">
              <hr/>
              <a href="#">Crear una cuenta</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;