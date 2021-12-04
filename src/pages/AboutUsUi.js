import React, { useEffect, useContext, useState, useRef } from "react";
import { Store } from "../context/store";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
// import { Alert } from "bootstrap";
import mailImg from "../Assets/mail.png";
import phoneImg from "../Assets/phone.png"
import addressImg from "../Assets/address.png"
import Footer from "../components/Footer";

function AboutUsUi() {
    let store = useContext(Store);
    let [aboutUs, SetAbout] = useState([]);
    let [main, setMain] = useState([]);
    let URL = "http://localhost:5100";
    let TopBtn = useRef()
    let Lstyles = {
        fontWeight: "bold",
        color: "red",
    }

    let date = new Date();
    let hours = date.getHours();
    let TimeOfDay;
    let styles = {
        color: "#fce130",
        fontSize: "small",
    };
    let BStyles = {
        width: "30%",
        height: "40px",
        // background:"white",
        color: "white",
        borderRadius: "10px",
        border: "none"
    };
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
        loadAbout();
        loadMain();
    }, []);

    let loadAbout = () => {
        let url = "http://localhost:5100/abouts";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetAbout(res);
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

        <div className=" AbCon flex">
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
                    aboutUs?.map((e) => {
                        console.log(e.logo)
                        let url = (URL + e.logo).replace('\\', '/')
                        console.log(url)
                        return (

                            <div className="AboutUs">
                                <div className="AboutBanner" style={{ backgroundImage: `url(${url})` }}>
                                    <div className="AB_Con">
                                        <div className="AB_ConP"><h2>{e.name} Cinema</h2></div>
                                    </div>
                                </div><br /><br /><br />
                                <div className="AboutLow">
                                    <div className="AboutLow_1">
                                        <div className="Low_1Img">
                                            <img src={URL + e.logo} alt="" />
                                        </div>
                                    </div>
                                    <div className="AboutLow_2">
                                        <p><span>We are</span> <br />{e.description}</p>
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
export default AboutUsUi;