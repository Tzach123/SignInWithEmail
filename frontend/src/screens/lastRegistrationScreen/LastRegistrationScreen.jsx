import React, { useEffect, useState } from 'react'

import { Card, CardHeader, CardBody, CardTextBlock } from '../../components/card/Card'
import Input from '../../components/input/Input'
import InputImg from '../../components/input/InputImg'
import Button from '../../components/button/Button'
import LoadingModal from '../../components/loadingModal/LoadingModal'
import Alert from '../../components/alert/Alert'

import { getUser, updateProcesUser } from '../../actions/userActions'

import './lastRegistrationScreen.css'

const LastRegistrationScreen = ({ match }) => {

    const token = match.params.accesstoken

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [userDetails, setUserDetails] = useState(false)


    useEffect(() => {
        getUser(token)
            .then(data => {
                setUserDetails(data);
            }).catch(e => {
                setError(e);
            })
    }, [token])


    const submitTarget = (e) => {
        e.preventDefault()
        const { first_name, last_name, phone_number, passport_img, selfie_img } = e.target

        setLoading(true)
        updateProcesUser({ first_name: first_name.value, last_name: last_name.value, phone_number: phone_number.value, passport_img, selfie_img }, token)
            .then(data => {
                const { success } = data
                setLoading(false)
                setError(false)
                if (success)
                    window.location.href = `/homepage/${token}`
            }).catch(e => {
                setLoading(false)
                setError(e)
            })
    }


    return (
        <div className='card-screen last-registration'>
            {loading && <LoadingModal text='The request is waiting for confirm...' />}
            <Card>
                <CardHeader>
                    <h1>Last registration</h1>
                    <h4>Please enter the details to complete the registration !</h4>
                </CardHeader>
                <CardBody onSubmit={submitTarget}>
                    {
                        /*    successMessage ? <Alert color='green' >{successMessage}</Alert> : */
                        <>
                            {error && <Alert color='red'>{error}</Alert>}
                            <CardTextBlock description='_id' value={userDetails._id} />
                            <CardTextBlock description='Email' value={userDetails.email} />
                            <CardTextBlock description='Created proccess user data' value={userDetails.createdProcessUserAt} />
                            <Input description='First name' id='first_name' type='text' />
                            <Input description='Last name' id='last_name' type='text' />
                            <Input description='Phone number' id='phone_number' type='number' />
                            <InputImg description='Passport image' id='passport_img' />
                            <InputImg description='Selfie image' id='selfie_img' />
                            <Button>Sign up</Button>
                        </>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default LastRegistrationScreen
