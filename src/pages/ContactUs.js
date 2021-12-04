import React, { useEffect, useContext, useState, useRef } from "react";
import { Store } from "../context/store";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
// import { Alert } from "bootstrap";
import mailImg from "../Assets/mail.png";
import phoneImg from "../Assets/phone.png";
import addressImg from "../Assets/address.png";
import Footer from "../components/Footer";

function ContactUs() {
    let store = useContext(Store);
    let [ContactUs, setContact] = useState();
    let [aboutUs, SetAbout] = useState([]);
    let [main, setMain] = useState([]);
    let TopBtn = useRef()
    let Lstyles = {
        fontWeight: "bold",
        color: "red",
    }
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

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            TopBtn.current.style.display = "block";
        } else {
            TopBtn.current.style.display = "none";
        }
    };


    function topFunction() {
        document.body.scrollTop = 10;
        document.documentElement.scrollTop = 10;
    };

    useEffect(() => {
        LoadContact();
        loadAbout();
        loadMain();
    }, [])

    let loadAbout = () => {
        let url = "http://localhost:5100/abouts";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetAbout(res);
            })
    };

    let LoadContact = () => {
        let url = "http://localhost:5100/contacts";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setContact(res);
            })
    };
    let loadMain = () => {
        let url = "http://localhost:5100/mainsites";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setMain(res)
            });
    };


    return <>

        <div className=" Containers flex">
            <div className="Sidebar">
                {main.map((e) => {
                    return (
                        <SideBar
                            logo={e.logo}
                        />)
                })}
            </div>
            <div className="bodyContainer">


                <Header
                    style={styles}
                    timer={TimeOfDay}
                />

                {
                    ContactUs?.map((e) => {
                        return (
                            <div className="ContactUsHold">
                                <div className="ContactUs">
                                    <div className="Contact_hold">
                                        <h1>We'd Love to hear from you!</h1><br />
                                        <div className="Con_Content">
                                            <div className="CC_main">
                                                <div className="CC_main_Img">
                                                    <img src={addressImg} />
                                                </div>

                                                <p>{e.address}</p>
                                            </div>
                                            <div className="CC_main">
                                                <div className="CC_main_Img">
                                                    <img src={mailImg} />
                                                </div>

                                                <p>Email us:<br /> <a href={`mailto:${e.email}`} style={Lstyles}>{e.email}</a></p>
                                            </div>
                                            <div className="CC_main">
                                                <div className="CC_main_Img">
                                                    <img src={phoneImg} />
                                                </div>

                                                <p>Call us:<br /> <a href={`tel:+234${e.phone}`} style={Lstyles}>  +234{e.phone}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

                <div>
                    {aboutUs.map((e) => {
                        return (
                            <Footer
                                foot={e.description}
                                name={e.name}
                            />)
                    })}
                </div>
            </div>
        </div>
        <button onClick={() => topFunction()} ref={TopBtn} className="myBtn" title="Go to top">Top</button>
    </>

}
export default ContactUs;