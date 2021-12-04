import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";

function LoginAdmin() {

    let store = useContext(Store);
    let [email, setEmail] = useState("");
    let [passwd, setPassword] = useState("");
    let [error, setError] = useState("");
    let [company, setCompany] = store.mainCompany;
    let history = useHistory();
    let [close, setClose] = store.closing;
    let [mainUrl] = store.hosting;



    let [, setCookies] = useCookies(['email', 'password', 'id', 'company', 'web', 'name', 'theater',
        'dev', 'counter']);

    let handleLogin = () => {
        let url = mainUrl + "/login";
        let data = { email, passwd };

        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.msg) {
                    setError(result.msg)
                } else {
                    setError("");
                    setCookies('email', result.email, { path: '/' })
                    setCookies('password', result.passwd, { path: '/' })
                    setCookies('id', result._id, { path: '/' })
                    setCookies('company', result.company, { path: '/' })
                    setCookies('name', result.name, { path: '/' })
                    setCookies('web', result.is_web_admin, { path: '/' })
                    setCookies('dev', result.is_dev_admin, { path: '/' })
                    setCookies('theater', result.is_theater_admin, { path: '/' })
                    setCookies('counter', result.is_counter_admin, { path: '/' })
                    history.push("/dashboard")
                }
            });
    };

    return <div className="login">
        <div className="login-center">
            <div className="login-head">
                <h2>LOGIN IN</h2>
            </div>
            <div className="flex login-form">
                <div className="">
                    <div style={{ 'color': 'red' }}>{error ? <div>{error}</div> : ""}</div>
                    <p style={{ 'color': 'black' }}>Sign-in with email:</p>
                    <input style={{ 'background': 'black', width: '20rem' }} type="text" name="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                    <input style={{ 'background': 'black', width: '20rem', color: 'white' }} type="password" name="passwd" placeholder="Your password" value={passwd} onChange={(e) => setPassword(e.target.value)} /> <br />
                    <button onClick={handleLogin}>Login</button>

                </div>
            </div>
        </div>
    </div >

}

export default LoginAdmin;