import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import AdminBar from "./AdminSidebar";
import ScheduleView from "./scheduleProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewSchedule() {
    let store = useContext(Store);
    let [movieSchedules, setMovieSchedules] = store.movieScheduleArr;
    let [screens, setScreens] = store.screenArr;
    let [movies, setMovies] = store.movieArr;
    let [movieScheduleId, setMovieScheduleId] = store.movieSchedule_id;
    let [screenId, setScreenId] = store.screen_id;
    let [movieId, setMovieId] = store.movie_id;
    let [time, setTime] = store.time;
    let [date, setDate] = store.date;
    let [msg, setMsg] = store.msg;
    let [close, setClose] = useState(false);
    let [screen_test, setScreen_test] = useState([]);
    let [location_test, setLocation_test] = useState([]);
    let [time_test, setTime_test] = useState([]);

    let btnHide = useRef();
    let btnShow = useRef();
    let moId;
    let scId;
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

    useEffect(() => {
        viewMovieSchedules();
        viewMovies()
        viewScreens()
        // console.log(movieId)
    }, []);

    function viewMovieSchedules() {
        let url = mainUrl + "/movieschedules";
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                setMovieSchedules([res]);
                console.log(res)
            });
    };
    let viewOneSchedule = (id) => {
        let url = mainUrl + "/movieSchedule/" + id;

        fetch(url)
            .then(res => res.json())
            .then(result => {
                // setMovieSchedules(result);
                // console.log(result[0].screen_id)
                console.log(result)

                // setLocation_test(result.location)
                // setTime_test(result.time)
                // console.log(result.screen[0].screen_id._id);
                // console.log(result.location[0].location_id.country);
                // console.log(result.time[0].time_id.price)
                // console.log(result.class[0].class_id.name)

            });
    }
    function viewMovies() {
        let url = mainUrl + "/movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                // setMovieId(result[0]._id);
                setMovies(result);
                // console.log(movieId);
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
    function movId(id) {
        moId = id;
        console.log(id, "movie")
    };
    function scrId(id) {
        scId = id;
        console.log(id, "screen")
    };
    function editMovieSchedule(i) {
        console.log(movieSchedules[i]);
        let item = movieSchedules[i];
        setTime(item.time);
        setMovieId(item.movie_id);
        setDate(item.date_showing);
        setScreenId(item.screen_id);
        setMovieScheduleId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateMovieSchedule() {
        let item = { date_showing: date, movie_id: moId, screen_id: scId, time };
        let url = mainUrl + "/movieSchedule/" + movieScheduleId;
        console.warn(movieScheduleId, url, item)

        fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(item)

        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                viewMovieSchedules();
                btnHide.current.style.display = 'none';
                btnShow.current.style.display = 'block';
            });
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };

    return <>
        <div>
            <h2 id="logout" onClick={() => handleLogOut()}>LOGOUT</h2>
        </div>
        <>
            <div className="flex" style={{ 'padding': '100px' }}>
                <div className="adminMain" >
                    <AdminBar />
                    <WebAdminBar />
                    <TheaterAdminBar />
                    <CounterAdminBar />
                </div>

                <div className="adminBody">
                    <div className="editing">
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }}>
                            <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                            <form>
                                <input style={{ color: "white", background: 'black' }} type="time" placeholder="Movie ID" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                <input style={{ color: "white", background: 'black' }} type="date" placeholder="Theater ID" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                        Select  Screen
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        {screens.map(x => {
                                            return (
                                                <div key={x._id}>
                                                    <Dropdown.Item onClick={() => scrId(x._id)}>{x.screen}</Dropdown.Item>
                                                </div>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
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
                                <button id="createBtn" type="button" onClick={() => updateMovieSchedule()}>Update</button>
                                <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                            </form>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Movie Schedule</h3>
                        <div className="thead flex">
                            <div className="tcol">Movie ID</div>
                            <div className="tcol">Screen ID</div>
                            <div className="tcol">Date Showing</div>
                            <div className="tcol">Time</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {
                            movieSchedules.map((e, i) => {
                                // if (e.company === cookie.company) {
                                return (
                                    <ScheduleView
                                        key={e._id}
                                        // company={e.company}
                                        // created_by={e.created_by}
                                        // movieID={e.screen_id.screen}
                                        movieID={e.location}
                                        dateShowing={e.date_showing}
                                        time={e.time}
                                        screenID={e.screen_id}
                                        editclick={() => editMovieSchedule(i)}
                                    />

                                )
                                // } else {
                                //     return (
                                //         <ScheduleView
                                //             key={e._id}
                                //             // created_by={e.created_by}
                                //             company={e.company}
                                //             viewone={() => viewOneSchedule(e.movie_id)}
                                //             movieID={e.movie_id}
                                //             time={e.time}
                                //             screenID={e.screen_id}
                                //             editclick={() => editMovieSchedule(i)}
                                //         />

                                //     )
                                // }
                            })
                        }
                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewSchedule;