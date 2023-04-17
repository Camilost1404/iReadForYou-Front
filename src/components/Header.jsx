import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Logo from '../assets/images/logo.png'
import '../assets/css/Header.css'


function Header() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    const logOut = async () => {

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_DJANGO_URL}/logout/`, {
                refresh_token: localStorage.getItem('refresh_token')
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }, { withCredentials: true });

            console.log('logout', data)
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            window.location.href = '/'
        } catch (e) {
            console.log('logout not working')
        }

    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={Logo} alt="Logo" width="80" className="d-inline-block align-text-top" />
                    I Read For U
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {!isAuth ?
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="bttn-press btn btn-inicio" to="login">Iniciar sesión</Link>
                                {/* <button className="btn btn-inicio">Iniciar sesión</button> */}
                            </li>
                            <li className="nav-item">
                                {/* <Link className="btn btn-inicio" to="/register">Registro</Link> */}
                                <button className="bttn-press btn btn-inicio">Registro</button>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {/* <Link className="btn btn-inicio" to="/register">Registro</Link> */}
                                <button className="bttn-press btn btn-inicio" onClick={logOut}>Logout</button>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav >
    );
}

export default Header;