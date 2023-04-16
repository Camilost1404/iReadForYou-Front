import React from "react";
import { Link } from "react-router-dom";

import Logo from '../assets/images/logo.png'
import '../assets/css/Header.css'


function Header() {
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
                </div>
            </div>
        </nav>
    );
}

export default Header;