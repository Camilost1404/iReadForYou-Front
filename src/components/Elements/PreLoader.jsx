import React from 'react'
import '../../assets/css/PreLoader.css'

function PreLoader(props) {
    return (
        <div className="container-loader">
            <div className="text">
                <h3>{props.text}</h3>
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