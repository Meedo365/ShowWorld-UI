import React, { useEffect, useContext, useRef, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import { Store } from "../context/store";
import NowShowing from "../components/NowShowing";
import { useCookies } from 'react-cookie';
import Footer from "../components/Footer";



function MovieUi() {
    let store = useContext(Store);
    let [moviese, setMoviese] = store.ShowMovies;
    let [LinkStyle, setLinkStyle] = store.ShowLstyle;
    let [mainUrl] = store.hosting;
    let [main, setMain] = useState([]);
    let TopBtn = useRef();
    let [aboutUs, SetAbout] = useState([]);
    let count = 0;
    let [cookie] = useCookies(['site']);
    let Lstyles = {
        textDecoration: "none",
        color: "#fce130"
    };
    let date = new Date()
    let hours = date.getHours()
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
        loadMovies();
        loadMain();
        loadAbout();
    }, []);
    let loadMovies = () => {
        let url = mainUrl + "/movies";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setMoviese(res);
                setLinkStyle(Lstyles)

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
                <br /><br />
                <br /> <br /><br />
                <div className="NewsHead"><h3>NOW SHOWING</h3></div><br />
                <div className="NowShw">
                    <div className="NowFlex">
                        {
                            moviese?.map((e) => {
                                if (cookie.site === e.company.toLowerCase()) {
                                    return (
                                        <NowShowing
                                            key={e._id}
                                            id={e._id}
                                            image={e.image}
                                            cinemaName={e.title}
                                            style={LinkStyle}
                                            synopsis={e.synopsis}
                                        />
                                    )
                                }
                            }
                            )}
                    </div>
                </div>
                <br /><br /> <br /><br /> <br /><br /> <br /><br />
                <button onClick={() => topFunction()} ref={TopBtn} className="myBtn" title="Go to top">Top</button>


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

export default MovieUi;