import React, { useEffect, useContext, useRef, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import { Store } from "../context/store";
import { useParams } from 'react-router-dom';
import Singlebooking from "../components/Singlebooking";
import { useCookies } from 'react-cookie';
import Footer from "../components/Footer";

function BookingUi() {

    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [Smovie, setSMovie] = useState()
    let { id } = useParams()
    let TopBtn = useRef()
    let count = 0;
    let [aboutUs, SetAbout] = useState([]);

    let Lstyles = {
        textDecoration: "none",
        color: "#fce130",
        fontSize: "small"

    }
    let [cookie] = useCookies(['site']);
    let [main, setMain] = useState([]);
    let date = new Date()
    let hours = date.getHours()
    let TimeOfDay;
    let styles = {
        color: "#fce130",
        fontSize: "small",
    }
    let BStyles = {
        width: "30%",
        height: "40px",
        // background:"white",
        color: "white",
        borderRadius: "10px",
        border: "none"
    }

    if (hours < 12) {
        TimeOfDay = "Morning"
        styles.color = "white"
        styles.fontSize = "60%"
    }

    else if (hours >= 12 && hours < 17) {
        TimeOfDay = "Afternoon"
        styles.color = "yellow"
        styles.fontSize = "60%"
    }
    else {
        TimeOfDay = "Night"


    };
    useEffect(() => {
        loadMain();
        loadAbout();
    }, [])
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            TopBtn.current.style.display = "block";
        } else {
            // TopBtn.current.style.display = "none";
        }
    };


    function topFunction() {
        document.body.scrollTop = 10;
        document.documentElement.scrollTop = 10;
    };
    let loadMain = () => {
        let url = mainUrl + "/mainsites";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setMain(res)
            });
    };
    let loadAbout = () => {
        let url = mainUrl + "/abouts";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetAbout(res);
            })
    };




    return <>
        <div className="Container flex">
            <div className="Sidebar">
                {main.map((e) => {
                    if (cookie.site === e.company.toLowerCase()) {
                        return (
                            <SideBar
                                logo={e.logo}
                            />)
                    }
                })}
            </div>
            <div className="bodyContainer">


                <Header
                    style={styles}
                    timer={TimeOfDay}
                />





                <div>

                    <Singlebooking

                    />

                </div>








                <button onClick={() => topFunction()} ref={TopBtn} className="myBtn" title="Go to top">Top</button>

                {/* <Footer/> */}




            </div>

        </div>
        <div>
            {aboutUs.map((e) => {
                if (cookie.site === e.company.toLowerCase()) {
                    return (
                        <Footer
                            foot={e.description}
                            name={e.name}
                        />)
                }
            })}
        </div>
    </>
}

export default BookingUi;