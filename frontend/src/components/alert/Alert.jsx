import React from 'react'
import './alert.css'

const Alert = ({ children, color }) => {

    return (
        <div className={`alert ${color}`} >
            {children}
        </div>
    )
}

export default Alert
