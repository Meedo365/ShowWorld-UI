import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Adminpanel() {
    let [id, setID] = useState('');
    let [name, setName] = useState('');
    let [cookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name', 'theater',
        'dev', 'counter']);

    let getID = () => {
        let newID = cookie.dev;
        let names = cookie.name;
        setName(names)
        if (newID === 'true') {
            return setID("showbar")
        }
    };
    useEffect(getID, []);
  return (
    <div>
      <div class="menu">
          <div className="welcome">
          <h1>Welcome, {name}</h1>
          </div>
        <div class="logoh">
        <Link to="/dashboard" className="flex" >
            <h5>Show</h5>
            <h6 style={{marginTop:"5px"}}>World</h6>
            </Link>
        </div>

        <div className="menu-options">
        <Link to="/devAdmin" >
            <li>
                <span class="material-icons" >
                    developer_mode
                </span>
                Developer
            </li>
            </Link>
            <Link to="/websiteAdmin" >
            <li>
            <span class="material-icons">
                            admin_panel_settings
                        </span>
                Website Admin
            </li>
            </Link>
            <Link to="/theaterAdmin" >
            <li>
            <span class="material-icons">
                            admin_panel_settings
                        </span>
               Theatre Admin
            </li>
            </Link>
            <Link to="/counter" >
            <li>
            <span class="material-icons">
                            admin_panel_settings
                        </span>
              Counter
            </li>
            </Link>
            <Link to="/users" >
            <li>
            <span class="material-icons">
            account_circle
                        </span>
              User
            </li>
            </Link>
            <Link to="/movies" >
            <li>
            <span class="material-icons">
            movie_creation
                        </span>
              Movies
            </li>
            </Link>
            <Link to="/cinemas" >
            <li>
            <span class="material-icons">
            local_movies
                        </span>
            Cinemas
            </li>
            </Link>
            <Link to="/bookings" >
            <li>
            <span class="material-icons">
            book_online
                        </span>
           Bookings
            </li>
            </Link>
            <Link to="/ticketbooking" >
            <li>
            <span class="material-icons">
            book_online
                        </span>
            Ticket Booking
            </li>
            </Link>
            <Link to="/locations" >
            <li>
            <span class="material-icons">
            location_on
                        </span>
            Locations
            </li>
            </Link>
            <Link to="/cinemas" >
            <li>
            <span class="material-icons">
            local_movies
                        </span>
            Cinemas
            </li>
            </Link>
            <Link to="/theaters" >
            <li>
            <span class="material-icons">
            local_movies
                        </span>
           Theaters
            </li>
            </Link>
            <Link to="/screens" >
            <li>
            <span class="material-icons">
            local_movies
                        </span>
           Screens
            </li>
            </Link>
            <Link to="/classes" >
            <li>
            <span class="material-icons">
            flight_class
                        </span>
          Classes
            </li>
            </Link>
            <Link to="/time" >
            <li>
            <span class="material-icons">
            timer
                        </span>
           Time
            </li>
            </Link>
            <Link to="/movieschedule" >
            <li>
            <span class="material-icons">
            schedule
                        </span>
           Movie Schedule
            </li>
            </Link>
            <Link to="/about-us" >
            <li>
            <span class="material-icons">
          contacts
                        </span>
           About Us
            </li>
            </Link>
            <Link to="/contact" >
            <li>
            <span class="material-icons">
            contacts
                        </span>
          Contact
            </li>
            </Link>
            <Link to="/news" >
            <li>
            <span class="material-icons">
            schedule
                        </span>
           News
            </li>
            </Link>
            <Link to="/terms-and-condition" >
            <li>
            <span class="material-icons">
            contacts
                        </span>
          Terms & conditions
            </li>
            </Link>
            <Link to="/upcoming-movies" >
            <li>
            <span class="material-icons">
            schedule
                        </span>
         Upcoming Movies
            </li>
            </Link>
            <Link to="/social-media" >
            <li>
            <span class="material-icons">
            add_moderator
                        </span>
                        Social Media
            </li>
            </Link>
            <Link to="/banner" >
            <li>
            <span class="material-icons">
           feed
                        </span>
          Banner
            </li>
            </Link>
            <Link to="/newsletter" >
            <li>
            <span class="material-icons">
            feed
                        </span>
        Newsletter
            </li>
            </Link>
            <Link to="/revenue-report" >
            <li>
            <span class="material-icons">
           summarize
                        </span>
        Revenue Report
            </li>
            </Link>
            <Link to="/site-settings" >
            <li>
            <span class="material-icons">
            perm_data_setting
                        </span>
    Site Setting
            </li>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default Adminpanel
