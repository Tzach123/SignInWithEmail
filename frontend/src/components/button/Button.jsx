import React from 'react'
import './button.css'

const Button = ({ children }) => {
    return (
        <div className='button-container'>
            <button type='submit' >{children}</button>
        </div>
    )
}

export default Button
