import React from 'react'
import '../../assets/css/PreLoader.css'

function PreLoader() {
    return (
        <div className="container-loader">
            <div class="text">
                <h3>Procesando Imagen...</h3>
            </div>

            <div class="loader">
                <div class="load-box">
                    <div class="load"></div>
                </div>
            </div>
        </div>
    )
}

export default PreLoader