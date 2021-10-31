import React from 'react'

const CardBody = ({ children, onSubmit }) => {
    return (
        <form className='card-body' onSubmit={onSubmit} >
            {children}
        </form>
    )
}

export default CardBody
