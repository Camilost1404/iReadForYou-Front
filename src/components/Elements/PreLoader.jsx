import React from 'react'
import '../../assets/css/PreLoader.css'

function PreLoader() {
    return (
        <div className="container-loader">
            <div className="text">
                <h3>Procesando Imagen...</h3>
            </div>

            <div className="loader">
                <div className="load-box">
                    <div className="load"></div>
                </div>
            </div>
        </div>
    )
}

export default PreLoader