import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../../assets/css/Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name) {
      setErrors({ ...errors, name: 'El nombre es requerido' });
      return;
    }

    if (!formData.last_name) {
      setErrors({ ...errors, last_name: 'El apellido es requerido' });
      return;
    }

    if (!formData.email) {
      setErrors({ ...errors, email: 'El correo electrónico es requerido' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ ...errors, email: 'El correo electrónico no es válido' });
      return;
    }

    if (!formData.password) {
      setErrors({ ...errors, password: 'La contraseña es requerida' });
      return;
    }

    if (formData.password.length < 6) {
      setErrors({
        ...errors,
        password: 'La contraseña debe tener al menos 6 caracteres',
      });
      return;
    }

    if (!formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'La confirmación de la contraseña es requerida',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'La contraseña y su confirmación no coinciden',
      });
      return;
    }

    const user = {
      email: formData.email,
      name: formData.name,
      last_name: formData.last_name,
      password: formData.password,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_DJANGO_URL}/register/`, user);

      console.log(response);
      localStorage.clear();
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      window.location.href = '/'

    } catch (error) {
      console.error(error);
    }
  };

  if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="contentWrapper row align-items-center justify-content-center pt-4 pb-4 px-2 gap-4 h-100">
      <div className="container">
        <form className="justify-content-center form-container" onSubmit={handleSubmit}>
          <h1 className="text-center">Crear una cuenta</h1>
          <div className="grupo-input">
            <input type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} />
          </div>
          {errors.name && <p className="error-message">{errors.name}</p>}
          <div className="grupo-input">
            <input type="text" placeholder="Apellido" name="last_name" value={formData.last_name} onChange={handleChange} />
          </div>
          {errors.last_name && <p className="error-message">{errors.last_name}</p>}
          <div className="grupo-input">
            <input type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="grupo-input">
            <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} />
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
          <div className="grupo-input">
            <input type="password" placeholder="Confirmar contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          <div className='frame'>
            <button type="submit" className='custom-bttn bttn'>
              Crear cuenta
            </button>
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

export default Register;