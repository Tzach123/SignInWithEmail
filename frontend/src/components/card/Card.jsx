import React from 'react'
import './card.css'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardTextBlock from './CardTextBlock'

const Card = ({ children }) => {
    return (
        <div className='card'>
            {children}
        </div>
    )
}

export { Card, CardBody, CardHeader, CardTextBlock }
