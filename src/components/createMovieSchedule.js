import React, { useContext, useEffect, useState } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Dropdown } from "react-bootstrap";

function CreateMovieSchedule() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [created_by, setCreated] = store.creating;
    let [screens, setScreens] = store.screenArr;
    let [locations, setLocations] = store.locationArr;
    let [classes, setClasses] = store.classArr;
    let [times, setTimes] = useState([]);


    let [movies, setMovies] = store.movieArr;
    let [time, setTime] = store.time;
    // let [date, setDate] = store.date;
    let [datess, setDate] = useState(null);
    let [msg, setMsg] = store.msg;
    let [scId, setScId] = useState(null);
    let [movieId, setMovieId] = store.movie_id
    let [loId, setLoId] = useState(null);
    let [tiId, setTiId] = useState(null);
    let [thId, setThId] = useState(null);
    let [thNam, setThNam] = useState(null);
    let [loNam, setLoNam] = useState(null);


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
        let id = cookie.id;
        let dev = cookie.dev;
        if (dev == 'true') {
            setClose('');
            setCreated(id);
        } else {
            setClose('none');
            setCompany(mainCompany);
            setCreated(id);
        }
    };
    getCompany();

    useEffect(() => {
        viewMovies();
    }, []);
    function viewScreens() {
        let url = mainUrl + "/screens";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setScreens(result);
                console.log(result);
            });
    };
    function viewMovies() {
        let url = mainUrl + " /movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                // setMovieId(result[0]._id);
                setMovies(result);
                viewTime();
                viewScreens();

                // console.log(movieId);
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
        console.log(id, "movie")
    };
    // screen
    function scrId(id, locId, theId, theNam) {
        setScId(id)
        setThId(theId)
        setThNam(theNam)
        setLoId(locId)
        console.log(id, "screen", locId, "location", theId, theNam, "theater")

        function viewLocation() {
            let url = mainUrl + "/location/" + locId;
            fetch(url)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setLoNam(result.country + " " + result.state + " " + result.city)
                });
        };
        viewLocation();
    };



    // time id
    function timId(id) {
        setTiId(id)
        console.log(id, "time")
    };
    setMovieId(movieId);
    function createMovieSchedule() {
        let url = mainUrl + "/movieschedule";
        let data = {
            location_id: loId, movie_id: movieId, screen_id: scId, time_id: tiId, theater_id: thId,
            company, created_by, date: datess
        };
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.status === 'ok') {
                    // history.push("/login")
                    console.log("successfully");
                    alert('Created')

                } else {
                    // console.log(result.error);
                    setMsg(result.error)
                }
            });
    };

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
                <h3 id="create">Create Movie Schedule</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form>
                        <input type="text" placeholder="Company" name="company" value={company} className={close} required />
                        <input type="text" placeholder="Created By" name="created_by" value={cookie.id} className={close} required />
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Movie
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movies.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => movId(x._id)}>{x.title}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === 'true') {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => movId(x._id)}>{x.company}---{x.title}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Screen
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {screens.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => scrId(x._id, x.theater_id.location_id, x.theater_id._id, x.theater_id.name)}>{x.theater_id.name}---{x.screen}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === "true") {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => scrId(x._id, x.theater_id.location_id, x.theater_id._id, x.theater_id.name)}>{x.company}---{x.theater_id.name}---{x.screen}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <label style={{ color: "#fff" }}> Theater</label>
                        <input type="text" style={{ color: "white", background: 'black' }} placeholder="Theater" value={thNam} readOnly />

                        <label style={{ color: "#fff" }}> Location</label>
                        <input type="text" style={{ color: "white", background: 'black' }} placeholder="Location" value={loNam} readOnly />

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Time
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {times.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => timId(x._id)}>{x.time}: ${x.price}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === "true") {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => timId(x._id)}> {x.company}--{x.time}: ${x.price}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <input style={{ color: "black", background: 'white' }} type="date" placeholder="Date" name="date" value={datess} onChange={(e) => setDate(e.target.value)} />
                        <button id="createBtn" type="button" onClick={() => createMovieSchedule()}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateMovieSchedule;