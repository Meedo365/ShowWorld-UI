import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import AdminBar from "./AdminSidebar";
import UpcomingView from "./upcomingProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewUpcoming() {
    let store = useContext(Store);
    let [upComMovies, setUpComMovies] = store.upcomingArr;
    let [cinemas, setCinemas] = store.cinemaArr;
    let [cinemaId, setCinemaId] = store.cinema_id;
    let [time, setTime] = store.time;
    let [title, setTitle] = store.title;
    let [date, setDate] = store.date;
    let [image, setImage] = store.image;
    let [number, setNumber] = store.number;
    let [upComMovieId, setUpComMovieId] = store.upComMovie_id;
    let [msg, setMsg] = store.msg;
    let btnHide = useRef();
    let btnShow = useRef();
    let cId;
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
        viewUpcoming();
        viewCinemas();
    }, []);

    function viewUpcoming() {
        let url = mainUrl + "/upcomings";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setUpComMovies(result);
            });
    };
    function viewCinemas() {
        let url = mainUrl + "/cinemas";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setCinemas(result);
                console.log(result);
            });
    };
    function ceId(id) {
        cId = id
        console.log(id, "cinema")
    };
    function editUpcoming(i) {
        console.log(upComMovies[i]);
        let item = upComMovies[i];
        setTitle(item.title);
        setCinemaId(item.cinema_id);
        // setImage(item.logo);
        setTime(item.showing_time);
        setDate(item.release_date);
        setUpComMovieId(item._id);

        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateUpcoming() {
        let item = { title, cinema_id: cId, showing_time: time, release_date: date, logo: image };
        let url = "mainUrl+ /upcoming/" + upComMovieId;
        console.warn(upComMovieId, item)

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
                viewUpcoming();
            });
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    let deleteUp = (id) => {
        let url = mainUrl + "/upcoming/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); viewUpcoming(); });


    };


    return <>
        <>
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
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }} >
                            <div>
                                <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                                <form>
                                    <input type="name" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <input type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                    {/* <input type="number" placeholder="Number of Screen" value={number} onChange={(e) => setNumber(e.target.value)} /> */}
                                    <input type="file" value={image} onChange={(e) => setImage(e.target.value)} />
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  Cinema
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            {cinemas.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => ceId(x._id)}>{x.name}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button id="createBtn" type="button" onClick={() => updateUpcoming()}>Update</button>
                                    <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Upcoming Movies</h3>
                        <div className="thead flex">
                            <div className="tcol">Title</div>
                            <div className="tcol1">Image</div>
                            <div className="tcol1">Date</div>
                            <div className="tcol">Time </div>
                            <div className="tcol">Cinema </div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {
                            upComMovies.map((e, i) => {
                                if (e.company === cookie.company) {
                                    return (
                                        <UpcomingView
                                            key={e._id}
                                            cinemaID={e.cinema_id}
                                            movieName={e.title}
                                            image={e.logo}
                                            releaseDate={e.release_date}
                                            releaseTime={e.showing_time}
                                            editclick={() => editUpcoming(i)}
                                            deleteclick={() => deleteUp(e._id)}

                                        />

                                    )
                                } else if (cookie.dev === 'true') {
                                    return (
                                        <UpcomingView
                                            key={e._id}
                                            cinemaID={e.cinema_id}
                                            movieName={e.title}
                                            image={e.logo}
                                            releaseDate={e.release_date}
                                            releaseTime={e.showing_time}
                                            editclick={() => editUpcoming(i)}
                                            deleteclick={() => deleteUp(e._id)}

                                        />

                                    )
                                }
                            })
                        }




                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewUpcoming;