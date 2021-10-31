import React, { useState } from 'react'

import { Card, CardHeader, CardBody } from '../../components/card/Card'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import LoadingModal from '../../components/loadingModal/LoadingModal'
import Alert from '../../components/alert/Alert'

import { createProcesUser } from '../../actions/userActions'

import './firstRegistrationScreen.css'

const FirstRegistrationScreen = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const submitTarget = (e) => {
        e.preventDefault()
        const { email, password, password_confirm } = e.target
        setLoading(true)
        createProcesUser(email.value, password.value, password_confirm.value)
            .then(data => {
                setLoading(false)
                setError(false)
                const { message, success } = data
                if (success)
                    setSuccessMessage(message)
            }).catch(e => {
                setLoading(false)
                setError(e)
            })
    }

    return (
        <div className='card-screen first-registration'>
            {loading && <LoadingModal text='The request is waiting for confirm...' />}
            <Card>
                <CardHeader>
                    <h1>First registration</h1>
                    <h4>Please enter the details for registration !</h4>
                </CardHeader>
                <CardBody onSubmit={submitTarget}>
                    {successMessage ? <Alert color='green' >{successMessage}</Alert> :
                        <>
                            {error && <Alert color='red'>{error}</Alert>}
                            <Input description='Email' id='email' type='email' />
                            <Input description='Password' id='password' type='password' />
                            <Input description='Password confirm' id='password_confirm' type='password' />
                            <Button>Sign up</Button>
                        </>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default FirstRegistrationScreen