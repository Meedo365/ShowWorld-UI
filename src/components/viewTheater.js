import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import AdminBar from "./AdminSidebar";
import TheaterView from "./theaterProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewTheater() {
    let store = useContext(Store);
    let [theaters, setTheaters] = store.theaterArr;
    let [cinemaId, setCinemaId] = store.cinema_id;
    let [locations, setLocations] = store.locationArr;
    let [cinemas, setCinemas] = store.cinemaArr;
    let [locationId, setLocationId] = store.location_id;
    let [theaterId, setTheaterId] = store.theater_id;
    let [movieId, setMovieId] = store.movie_id;
    let [movies, setMovies] = store.movieArr;
    let [name, setName] = store.name;
    let [number, setNumber] = store.number;
    let [close, setClose] = useState(false);
    let btnHide = useRef();
    let btnShow = useRef();

    let [msg, setMsg] = store.msg;
    let mId;
    let cId;
    let lId;
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
        viewTheater();
        viewMovies()
        viewLocations()
        viewCinemas()
    }, []);
    function viewMovies() {
        let url = mainUrl + " /movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovies(result);
                // console.log(result);
            });
    };
    function viewLocations() {
        let url = mainUrl + "/locations";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setLocations(result);
                // console.log(result);
            });
    };
    function viewCinemas() {
        let url = mainUrl + "/cinemas";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setCinemas(result);
                // console.log(result);
            });
    };
    function moId(id) {
        mId = id
        console.log(id, "movie")
    };
    function ceId(id) {
        cId = id
        console.log(id, "cinema")
    };
    function loId(id) {
        lId = id
        console.log(id, "location")
    };
    function viewTheater() {
        let url = mainUrl + "/theaters";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setTheaters(result);
                console.log(result[0].name);
            });
    };
    function editTheater(i) {
        console.log(theaters[i]);
        let item = theaters[i];
        setName(item.name);
        setCinemaId(item.cinema_id);
        // setImage(item.logo);
        setLocationId(item.location_id);
        setMovieId(item.movie_id);
        setNumber(item.no_of_screen);
        setTheaterId(item._id);

        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateTheater() {
        let item = { name, cinema_id: cId, location_id: lId, movie_id: mId, no_of_screen: number };
        let url = mainUrl + "/theater/" + theaterId;
        console.warn(theaterId, item)

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
                //  viewLocations();
            });
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
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
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }}>
                            <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                            <form>
                                <input type="text" placeholder="Name of Cinema" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="number" placeholder="Number of Screen" value={number} onChange={(e) => setNumber(e.target.value)} />
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

                                {/* <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                        Select  location
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        {locations.map(x => {
                                            return (
                                                <div key={x._id}>
                                                    <Dropdown.Item onClick={() => loId(x._id)}>{x.country} {x.state} {x.city}</Dropdown.Item>
                                                </div>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                        Select  Movie
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        {movies.map(x => {
                                            return (
                                                <div key={x._id}>
                                                    <Dropdown.Item onClick={() => moId(x._id)}>{x.title}</Dropdown.Item>
                                                </div>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown> */}
                                <button id="createBtn" type="button" onClick={() => updateTheater()}>Update</button>
                                <button id="createBtn" type="button" onClick={() => cancel()}>Update</button>

                            </form>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Theaters</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">Theater Name</div>
                            <div className="tcol">Location</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {
                            theaters.map((e, i) => {
                                if (e.company === cookie.company) {
                                    return (
                                        <TheaterView
                                            key={e._id}
                                            theaterName={e.name}
                                            locationID={e.location_id}
                                            editclick={() => editTheater(i)}

                                        />
                                    )
                                } else if (cookie.dev === 'true') {
                                    return (
                                        <TheaterView
                                            key={e._id}
                                            theaterName={e.name}
                                            locationID={e.location_id}
                                            company={e.company}
                                            editclick={() => editTheater(i)}

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

export default ViewTheater;