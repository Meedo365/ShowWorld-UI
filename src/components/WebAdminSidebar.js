import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function WebAdminBar() {
    let [id, setID] = useState('');
    let [name, setName] = useState('');
    let [cookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name', 'theater',
        'dev', 'counter']);

    let getID = () => {
        let newID = cookie.web;
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

                    </div>
                </Link>

                <Link to="/theaterAdmin" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">

                        <p>theater admin</p>
                    </div>
                </Link>

                <Link to="/counter" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">

                    </div>
                </Link>

                <Link to="/users" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <p>users</p>
                    </div>
                </Link>

                <Link to="/movies" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Movies</p>
                    </div>
                </Link>

                <Link to="/cinemas" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">

                        <p>Cinemas</p>
                    </div>
                </Link>
                <Link to="/time" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Time</p>
                    </div>
                </Link>
                <Link to="/bookings" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Bookings</p>
                    </div>
                </Link>

                <Link to="/locations" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Locations</p>
                    </div>
                </Link>

                <Link to="/theaters" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Theaters</p>
                    </div>
                </Link>

                <Link to="/screens" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Screens</p>
                    </div>
                </Link>

                <Link to="/classes" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Classes</p>
                    </div>
                </Link>

                <Link to="/movieschedule" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Movie Schedule</p>
                    </div>
                </Link>

                <Link to="/about-us" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>About Us</p>
                    </div>
                </Link>

                <Link to="/contact" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Contact</p>
                    </div>
                </Link>

                <Link to="/news" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>News</p>
                    </div>
                </Link>

                <Link to="/terms-and-condition" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>terms & condition</p>
                    </div>
                </Link>

                <Link to="/upcoming-movies" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Upcoming Movies</p>
                    </div>
                </Link>

                <Link to="/social-media" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Social Media</p>
                    </div>
                </Link>

                <Link to="/banner" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>banner</p>
                    </div>
                </Link>

                <Link to="/newsletter" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Newsletter</p>
                    </div>
                </Link>

                <Link to="/revenue-report" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex">
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>revenue report</p>
                    </div>
                </Link>

                <Link to="/site-settings" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                    <div className="barRow flex" >
                        <img src="https://image.flaticon.com/icons/png/128/1246/1246234.png" alt="" />
                        <p>Main Site Settings</p>
                    </div>
                </Link>



            </div>
        </>
    )
}
export default WebAdminBar;