import React from 'react'

const CardTextBlock = ({ description, value }) => {
    return (
        <div className='card-text-block'>
            <span>{description}</span>
            <span>{value}</span>
        </div>
    )
}

export default CardTextBlock
