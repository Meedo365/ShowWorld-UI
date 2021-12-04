import React, { useContext, useEffect } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Dropdown } from "react-bootstrap";

function CreateTheater() {
    let store = useContext(Store);
    let [created_by, setCreated] = store.creating;
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [locations, setLocations] = store.locationArr;
    let [cinemas, setCinemas] = store.cinemaArr;
    let [movies, setMovies] = store.movieArr;
    let [name, setName] = store.name;
    let [number, setNumber] = store.number;
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
    let getCompany = () => {
        let mainCompany = cookie.company;
        let id = cookie.id;
        let dev = cookie.dev;
        if (dev == 'true') {
            setClose('');
            setCompany("")
            setCreated(id);
        } else {
            setClose('none');
            setCompany(mainCompany);
            setCreated(id);
        }
    };
    getCompany();
    useEffect(() => {
        viewLocations();
        viewCinemas();
        viewMovies();
    }, []);
    function viewMovies() {
        let url = mainUrl + " /movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovies(result);
                console.log(result);
            });
    };
    function viewLocations() {
        let url = mainUrl + "/locations";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setLocations(result);
                console.log(result);
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
    function createTheater(id) {
        let url = mainUrl + "/theater";
        let data = { name, cinema_id: cId, location_id: lId, no_of_screen: number, company, created_by };
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
                console.log(result);
                if (result.status === 'ok') {
                    // setLocationId(result.data._id);
                    // history.push("/login")
                    console.log("successfully");

                } else {
                    console.log(result.error);
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
                <h3 id="create">Create New Theater</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form>
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={created_by} className={'none'} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Name of Theater" value={name} onChange={(e) => setName(e.target.value)} />
                        {/* <input type="number" placeholder="Number of Screen" value={number} onChange={(e) => setNumber(e.target.value)} /> */}
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", height: "3rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Cinema
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {cinemas.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => ceId(x._id)}>{x.name}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === "true") {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => ceId(x._id)}>{x.name}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", height: "3rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Location
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {locations.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => loId(x._id)}>{x.country} {x.state} {x.city}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === "true") {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => loId(x._id)}>{x.country} {x.state} {x.city}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>


                        <button id="createBtn" type="button" onClick={() => createTheater()}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateTheater;