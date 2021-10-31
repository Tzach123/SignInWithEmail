import React, { useEffect, useState } from 'react'
import { getUser } from '../../actions/userActions'
import LoadingModal from '../../components/loadingModal/LoadingModal'
import Alert from '../../components/alert/Alert'
import './homePage.css'

const HomePage = ({ match }) => {

    const token = match.params.accesstoken

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUser(token).then(data => {
            console.log(data);
            setLoading(false)
            setUser(data)
        }).catch(e => {
            setLoading(false)
            setError(e)
        })
    }, [token])
    return (
        <div className='home-page'>
            <h1>Home Page</h1>
            {error && <Alert color='red'>{error}</Alert>}
            {loading ? <LoadingModal /> :
                <>
                    {!user ?
                        <>
                            <h4>You must to SignIn!</h4>
                            <a href='/firstregistration'>SignIn</a>
                        </> :
                        <>
                            <h3>Welcome {user.firstName} {user.lastName}!</h3>
                        </>}
                </>}
        </div>
    )
}

export default HomePage
