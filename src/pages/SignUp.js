import React, { useEffect, useContext, useState, useRef } from "react";
import { Store } from "../context/store";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import SideBar from "../component/Sidebar";
import { Alert } from "bootstrap";


function SignUp() {
    let store = useContext(Store);
    let [open, setOpen] = Store.ShowOpen;
    let [Uname, setName] = Store.ShowUname;
    let [phone, setNum] = Store.ShowPhone;
    let [email, setEmail] = Store.ShowEmail;
    let [passwd, setPass] = Store.ShowPasswd;
    let TopBtn = useRef()

    let Lstyles = {
        textDecoration: "none",
        color: "#fce130",

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

    let handleSign = () => {



        let url = "http://localhost:5100/user";
        let payload = {
            Uname,
            phone,
            email,
            passwd

        };
        //This is using a fetch promise
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Post",
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((result) => {
            });
        setName("");
        setNum("");
        setEmail("");
        setPass("");


    };


    return <>

        <div className="Container flex">
            <div className="Sidebar">
                <SideBar />


            </div>
            <div className="bodyContainer">


                <Header

                />


                <div className="modals ">

                    <div className="modalContent ">
                        <div className="modalText">
                            <div className="modalHeader">
                                <br />
                                <h2>Sign up</h2>
                            </div>
                            <div className="modalBody">

                                <div className="modalMails">
                                    <form >
                                        <input className="prod-1" type="text" placeholder=" Full Name" name="name" value={Uname} onChange={(e) => setName(e.target.value)} /><br /><br />
                                        <input className="prod-1" type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                                        <input className="prod-1" type="password" placeholder="*Password (min 6 characters)" name="passwd" value={passwd} onChange={(e) => setPass(e.target.value)} /><br /><br />
                                        <input className="prod-1" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{2}" placeholder="phone" name="phone" value={phone} onChange={(e) => setNum(e.target.value)} /><br /><br />
                                        <button type="submit" onClick={() => handleSign()} className="ModalMainBtn" style={{ textDecoration: "none", color: "white" }}>Continue</button>


                                    </form>
                                </div>


                            </div>
                            <div className="modalFooter">
                                <p>By clicking Continue or Continue with Google or<br />
                                    Facebook you agree to our Terms of<br /> Use  and Privacy Policy. Show World may send you <br />
                                    communications; you may change your preferences<br /> in your account settings. We'll never post without <br />
                                    your permission.</p>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </div>



        <button onClick={() => topFunction()} ref={TopBtn} className="myBtn" title="Go to top">Top</button>









    </>

}
export default SignUp;