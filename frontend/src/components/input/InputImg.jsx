import React from 'react'
import './input.css'

const InputImg = ({ description, id, type }) => {
    return (
        <div className='input-container'>
            <label htmlFor={id}>{description}</label>
            <input id={id} name={id} type='file' accept="image/*" required />
        </div>
    )
}

export default InputImg
