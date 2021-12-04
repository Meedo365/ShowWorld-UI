import React, { useContext, useState, useEffect, useRef } from "react";
import { PaystackButton } from "react-paystack"
import AdminBar from "./AdminSidebar";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function CreateTicketbooking() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [theaters, setTheaters] = store.theaterArr;
    let [screens, setScreens] = store.screenArr;
    let [movies, setMovies] = store.movieArr;

    let [locations, setLocations] = store.locationArr;
    let [classes, setClasses] = store.classArr;
    let [times, setTimes] = useState([]);
    let [time, setTime] = store.time;
    let [date, setDate] = store.date;
    let [msg, setMsg] = store.msg;

    let [movieSchma, setMovieShema] = useState([]);

    let [scId, setScId] = useState(null);
    let [movieId, setMovieId] = store.movie_id
    let [loId, setLoId] = useState(null);
    let [tiId, setTiId] = useState(null);
    let [thId, setThId] = useState(null);
    let [clId, setClId] = useState(null);
    let [amount, setAmount] = useState("")
    let [movieName, setMovieName] = useState("")
    let [name, setName] = store.name;
    let [email, setEmail] = store.email;
    const publicKey = "pk_test_332dac7ec4c199f3168acb3f6cb84050e526aeb9"
    let btnShow = useRef();
    let btnHide = useRef();
    let btnShow_ = useRef();
    let btnHide_ = useRef();
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);

    let [mainUrl] = store.hosting;
    let handleLogOut = async () => {
        let id = cookie.id;
        let email = cookie.email;
        let passwd = cookie.password;
        let active = false;
        let url = mainUrl + id;
        let data = { email, passwd, active };
        if (window.confirm('Are you sure, you want to LogOut?')) {
            await axios.put(url, data).data;
            removeCookie();
            history.push("/login")
        }
    };

    let getCompany = () => {
        let mainCompany = cookie.company;
        let web = cookie.web;
        let theater = cookie.theater;
        let counter = cookie.counter;
        setCompany(mainCompany)
        if (web || theater || counter === "true") {
            return setClose('none')
        }
        setCompany(mainCompany)
    };
    getCompany()

    useEffect(() => {
        viewMovies();
    }, []);

    function viewMovies(id) {
        let url = mainUrl + "/movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovies(result);
                // console.log(result,"all movie")
                // viewLocations();
                // viewClass();
                // viewTime();
                // viewScreens();
                // viewTheater();
            });


    };
    function viewScreens() {
        let url = mainUrl + "/screens";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setScreens(result);
            });
    };
    function viewTheater() {
        let url = mainUrl + "/theaters";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setTheaters(result);
                // console.log(result);
            });
    }
    function viewLocations() {
        let url = mainUrl + "/locations";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setLocations(result);
            });
    };
    function viewClass() {
        let url = mainUrl + "/classes";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setClasses(result);
            });
    };
    function viewTime() {
        let url = mainUrl + "/times";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setTimes(result);
            });
    };
    // movie
    function movId(id) {
        setMovieId(id)
        let urls = mainUrl + "/movieschedule/" + id;
        fetch(urls)
            .then(res => res.json())
            .then(result => {
                setMovieShema(result);
                theId(id);
                // console.log(result,"booked schema for one movie")
            });
        console.log(id, "movie")
    };
    function theId(id,) {
        // alert("yes")
        let urls = mainUrl + "/theater/" + id;
        console.log(id)

        fetch(urls)
            .then(res => res.json())
            .then(result => {
                setLocations(result)
                // console.log(result)
                //   setLoId(id)
                //   setThId(id)

                console.log(result, "booked schema for one movie and location and theater")
            });
        // console.log(id,thid, "theaters id")
    }
    // screen
    function scrId(id) {
        setScId(id)
        console.log(id, "screen")
    };
    // class id
    function claId(id) {
        setClId(id)
        console.log(id, "class")
    };
    // location id
    function locId(id, idx) {
        setThId(id);
        setLoId(idx)
        console.log(id, "theater", idx, "location")
    };
    // theater

    // time id
    function timId(id) {
        setTiId(id)
        console.log(id, "time")
    };

    function createTicket() {
        let url = mainUrl + "/ticketbook";
        let data = { movie_id: movieId, time_id: tiId, location_id: loId, theater_id: thId, screen_id: scId, class_id: clId, user_id: cookie.id };
        console.log(data);
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result, "scuccess");

                setAmount(result.time_id.price * 100);
                setEmail(result.user_id.email);
                setName(result.user_id.username);
                setMovieName(result.movie_id.title);
                console.log(result.time_id.price * 100, result.user_id.email, result.user_id.username, result.movie_id.title)
                console.log("payment successful", movieName, amount, name, email);
                btnShow_.current.style.display = "none";
                btnHide_.current.style.display = "block";
            });
    }
    const componentProps = {
        email,
        amount,
        movieName,
        name,
        metadata: {
            name
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>

            alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! Don't leave :("),
    }
    return <>
        <div>
            <h2 id="logout" onClick={() => handleLogOut()}>LOGOUT</h2>
        </div>
        <div className="flex" style={{ 'padding': '100px' }}>
            <div className="adminMain" >
                <AdminBar />
                <WebAdminBar />
                <TheaterAdminBar />
                <CounterAdminBar />
            </div>

            <div className="adminBody">
                <h3 id="create">Get a New Ticket Without Booking</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form>
                        {/* <input type="text" placeholder="Company" name="company" value={company} className={close} required />
                        <input type="text" placeholder="Created By" name="created_by" value={cookie.id} className={close} required /> */}
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                Select  Movie
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movies.map(x => {
                                    return (
                                        <div key={x._id}>
                                            <Dropdown.Item onClick={() => movId(x._id)}>{x.title}</Dropdown.Item>
                                        </div>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                Select  Screen
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movieSchma.map(x => {
                                    return (
                                        <div key={x._id}>
                                            <Dropdown.Item onClick={() => scrId(x.screen_id._id)}>{x.screen_id.screen}</Dropdown.Item>
                                        </div>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                Select  Class
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movieSchma.map(x => {
                                    return (
                                        <div key={x._id}>
                                            <Dropdown.Item onClick={() => claId(x.class_id._id)}>{x.class_id.name}</Dropdown.Item>
                                        </div>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                Select  Time
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movieSchma.map(x => {
                                    return (
                                        <div key={x._id}>
                                            <Dropdown.Item onClick={() => timId(x.time_id._id)}>{x.time_id.time},
                                                {x.time_id.date},${x.time_id.price}</Dropdown.Item>
                                        </div>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>

                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                Select  theater
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {locations.map(x => {
                                    if (locations) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => locId(x._id, x.location_id._id)} >{x.name},{x.location_id.city}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </form>
                    <button id="createBtn" type="button" ref={btnShow_} style={{ display: "", fontSize: "10px" }} onClick={() => createTicket()}>Get Ticket</button>
                    <button ref={btnHide_} type="button" style={{ display: "none", fontSize: "10px" }} disabled>
                        <PaystackButton  {...componentProps} /></button>
                </div>
            </div>
        </div>
    </>
}

export default CreateTicketbooking;