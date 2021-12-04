import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
function CounterAdminBar() {
    let [id, setID] = useState('');
    let [name, setName] = useState('');
    let [cookie, setCookies, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name', 'theater',
        'dev', 'counter']);

    let getID = () => {
        let newID = cookie.counter;
        let names = cookie.name;
        setName(names)
        if (newID === 'true') {
            return setID("showbar")
        }
    };
    useEffect(getID, []);


    return (
        <>
            <div className="adminbar" id={id}>
                <Link to="/dashboard" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div>
                        <h1>Welcome, {name}</h1>
                        <img src="https://image.flaticon.com/icons/png/128/2345/2345338.png" alt="" />
                    </div>
                </Link>

                <Link to="/users" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>users</p>
                    </div>
                </Link>

                <Link to="/bookings" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Bookings</p>
                    </div>
                </Link>

                <Link to="/upcoming-movies" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Upcoming Movies</p>
                    </div>
                </Link>

            </div>
        </>
    )
}
export default CounterAdminBar;