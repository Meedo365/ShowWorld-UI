import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../utils/alert';
import { Store } from "../context/store"

function ActivationEmail() {
    const { activation_token } = useParams()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
        , { useContext }

    let store = useContext(Store);
    let [mainUrl] = store.hosting;


    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    setLoading(!loading)
                    const res = await axios.post(mainUrl + '/activate', activation_token)
                    setSuccess(res.data.msg)
                    setLoading(!loading)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])

    return (
        <div>
            {err && showErrMsg}
            {success && showSuccessMsg}

            <div className="activate" link="back-link">
                <h3>Account Sucessfully Activated</h3><br />
                <Link to="/login" style={{ color: 'white', fontSize: '25px', textDecoration: 'none', background: 'cornflowerblue' }}>Click to login</Link>
            </div>
        </div>
    )
}

export default ActivationEmail;