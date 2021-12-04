import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Store } from "../context/store";
import Address from "../Assets/address.png";
import SeatCompoOne from "../components/SeatCompoOne"
import SeatCompoTwo from "../components/SeatCompoTwo";
import SeatCompoThree from "../components/SeatCompoThree";
import { useParams } from 'react-router-dom';
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useCookies } from 'react-cookie';


let SelectSeat = () => {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [title, setTitle] = store.title;
    let [image, setImage] = store.image;
    let [movieSchedules, setMovieSchedules] = store.movieScheduleArr;
    let [date, setDate] = store.date;
    let [screenId, setScreenId] = store.screen_id;
    let [time, setTime] = store.time;
    let [price,] = store.price;
    let [email, setEmail] = store.email;
    let [seatPay, SetSeatPay] = store.seatings;
    let [schedule, SetSchedule] = useState([]);
    let [cookie, SetCookie] = useCookies([]);

    let id = useParams();
    let [msg, setMsg] = store.msg
    let pageOne = useRef();
    let pageTwo = useRef();
    let pageThree = useRef();
    let btnPageThree = useRef();
    let btnPageTwo = useRef();
    let btnReturnPage = useRef()


    useEffect(() => {
        loadSchedule();
    }, []);

    let loadSchedule = () => {
        let url = mainUrl + "/movieschedule-one/" + id.ix;
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setMovieSchedules(res);
            });
    };

    let nextPage = () => {
        if (screenId > 10) {
            setMsg("You have exceed the maximum number of tickets");
        }
        else if (!price) {
            setMsg("To Continue, You have to select a  ticket");
        } else {
            pageOne.current.style.display = "none";
            btnPageTwo.current.style.display = "none";
            pageTwo.current.style.display = "block";
            btnPageThree.current.style.display = "block";
            btnReturnPage.current.style.display = "block";
        }
    }
    let nextPageTwo = () => {
        let url = "http://localhost:5100/userbooked"
        let item = {
            // movie_id: movieId, date: date, time: time, price: price,
            // username: username, movieName: movieName, screenName: screenName,
            // theaterName: theaterName, locationName: locationName
        }
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // pageTwo.current.style.display = "none";
                // pageOne.current.style.display = "none";
                // pageThree.current.style.display = "block";
                // btnPageThree.current.style.display = "none"
                // btnPageTwo.current.style.display = "none";
            })
        pageTwo.current.style.display = "none";
        pageOne.current.style.display = "none";
        btnPageThree.current.style.display = "none"
        btnPageTwo.current.style.display = "none";
        btnReturnPage.current.style.display = "none";
        pageThree.current.style.display = "block";
        setMsg('')

    }


    let returnPage = () => {
        pageThree.current.style.display = "none";
        btnPageThree.current.style.display = "none";
        btnReturnPage.current.style.display = "none";
        pageTwo.current.style.display = "none";
        pageOne.current.style.display = "block";
        btnPageTwo.current.style.display = "block";
    }
    return <>
        <div className="maincen">
            <div className="cen">
                <Nav />
                <div style={{ paddingTop: '120px', paddingLeft: '50px' }}>
                    {movieSchedules.map((e, i) => {
                        return (
                            <section className="seatContainer" key={i}>
                                <section className="seatMovieImage">
                                    <img src={mainUrl + e.movie_id.image} alt="movie-image" />
                                </section>

                                <section className="seatDetails"
                                    key={i}
                                >
                                    <div ref={pageOne} style={{ display: "" }}>
                                        <SeatCompoOne
                                            timePrice={cookie.price}
                                            // timePrice={e.time_id.price}
                                            timeTime={e.time_id.time}
                                            timeDate={e.date}
                                            movieTitle={e.movie_id.title}
                                            movieSynosis={e.movie_id.synopsis}
                                            movieImage={e.movie_id.image}
                                            screenName={e.screen_id.screen}
                                            screenVvip={e.screen_id.vvip}
                                            screenVip={e.screen_id.vip}
                                            screenRegular={e.screen_id.regular}
                                            theaterName={e.theater_id.name}
                                            locationCountry={e.location_id.country}
                                            locationState={e.location_id.state}
                                            locationCity={e.location_id.city}
                                        />
                                    </div>
                                    <br />
                                    <div ref={pageTwo}
                                        style={{ display: "none" }}
                                    >
                                        <SeatCompoTwo
                                            // timePrice={e.time_id.price}
                                            timePrice={cookie.price}
                                            timeTime={e.time_id.time}
                                            timeDate={e.date}
                                            movieTitle={e.movie_id.title}
                                            movieSynosis={e.movie_id.synopsis}
                                            movieImage={e.movie_id.image}
                                            screenName={e.screen_id.screen}
                                            screenVvip={e.screen_id.vvip}
                                            screenVip={e.screen_id.vip}
                                            screenRegular={e.screen_id.regular}
                                            theaterName={e.theater_id.name}
                                            locationCountry={e.location_id.country}
                                            locationState={e.location_id.state}
                                            locationCity={e.location_id.city}
                                        />
                                    </div>

                                    <div ref={pageThree} style={{ display: "none" }}>
                                        <SeatCompoThree />
                                    </div>
                                    <div><button id="btnContinue" ref={btnPageTwo} style={{ display: "" }} onClick={() => nextPage()}>Continue</button></div>
                                    <div id="divReturn">
                                        <div className="btnGrp"><button id="btnContinue" ref={btnPageThree} style={{ display: "none" }} onClick={() => nextPageTwo()}>Continue</button></div>
                                        <div className="btnGrp"><button id="btnChange" ref={btnReturnPage} style={{ display: "none" }} onClick={() => returnPage()}>Change My Seats</button></div>

                                    </div>

                                </section>
                            </section>
                        )
                    })
                    }
                </div>
                <Chat />
                <Footer />
            </div>
        </div>
    </>

}
export default SelectSeat;