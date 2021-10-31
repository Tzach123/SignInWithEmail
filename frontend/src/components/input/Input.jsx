import React from 'react'
import './input.css'

const Input = ({ description, id, type }) => {
    return (
        <div className='input-container'>
            <label htmlFor={id}>{description}</label>
            <input id={id} name={id} type={type} required />
        </div>
    )
}

export default Input
