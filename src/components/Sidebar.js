import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Img1 from "../Assets/NewLogo.jpeg";
import Ads from "./Ads";
import { Store } from "../context/store";
import { useCookies } from 'react-cookie';


function SideBar(props) {
    let [cookie] = useCookies(['site'])
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [AdsManager, setAds] = store.ShowAds;
    let [Location, setLocation] = store.ShowLocations;
    let [open, setOpen] = store.ShowOpen;
    let route = "/upcomings/" + props.id
    let [main, setMain] = useState([]);

    let styles = {
        textDecoration: "none",
        color: "#fce130"
    };

    useEffect(() => {
        loadLocations();
        loadMain();
    }, []);

    let loadLocations = () => {
        let url = mainUrl + "/locations";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setLocation(res)

            });
    };
    let loadMain = () => {
        let url = mainUrl + "/mainsites";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setMain(res)
            });
    };
    let handleSign = () => {
        //         setOpen(true);
        //         // setMsg(email);
        //         // window.localStorage.setItem("user", email);
    };

    return <>
        <div className="SideBar ">
            <div className="Logo">
                <Link to={`/${cookie.site}/home`} alt="" > <img src={mainUrl + props.logo} alt="logo" /></Link>
            </div>
            <ul className="SideContent">
                <li><Link to={`/${cookie.site}/aboutus`} style={styles}>About Us</Link></li>
                <li><Link to={`/${cookie.site}/moviess`} className="dropbtn" style={styles}>Movies</Link></li>
                <li><Link to={`/${cookie.site}/contacts`} style={styles}>Contact Us</Link></li>
                <li><Link to={`/${cookie.site}/service`} style={styles}>Services</Link></li>
                <li><Link to={`/${cookie.site}/signIn`} onClick={() => handleSign()} style={styles}>Sign in</Link></li>

            </ul>
            <br /><br />
        </div>
    </>
};

export default SideBar;