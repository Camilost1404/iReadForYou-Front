import React from 'react';
import "../../assets/css/Auth.css"
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  manejarCambioEmail = (evento) => {
    this.setState({ email: evento.target.value });
  }

  manejarCambioPassword = (evento) => {
    this.setState({ password: evento.target.value });
  }

  manejarCambioConfirmPassword = (evento) => {
    this.setState({ confirmPassword: evento.target.value });
  }

  manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert('La contraseña y la confirmación de contraseña deben ser iguales.');
      return;
    }
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
      <div className="contentWrapper row align-items-center justify-content-center pt-4 pb-4 px-2 gap-4 h-100">
        <div className="container">
          <form className='justify-content-center form-container' onSubmit={this.manejarEnvioFormulario}>
            <h1 className='text-center'>Registro</h1>
            <input type="email" placeholder="Correo electrónico" value={this.state.email} onChange={this.manejarCambioEmail} />
            <input type="password" placeholder="Contraseña" value={this.state.password} onChange={this.manejarCambioPassword} />
            <input type="password" placeholder="Confirmar contraseña" value={this.state.confirmPassword} onChange={this.manejarCambioConfirmPassword} />
            <div className='frame'>
              <button className='custom-bttn bttn' type="submit"><span>Registrarse</span></button>
            </div>
            <div className="__container">
              <hr />
              <Link to="/login">Ya tengo cuenta</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;