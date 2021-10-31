import React from 'react'

import Spinner from './Spinner'

import './loadingModal.css'

const LoadingModal = ({ text }) => {
    return (
        <div className='loading-modal'>
            <h3>{text}</h3>
            <Spinner />
        </div>
    )
}

export default LoadingModal
