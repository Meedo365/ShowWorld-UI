import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import CinemaView from "./cinemaprops";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Dropdown } from "react-bootstrap";


function ViewCinema() {
    let store = useContext(Store);
    let [cinemas, setCinemas] = store.cinemaArr;
    let [name, setName] = store.name;
    let [image, setImage] = store.image;
    let [number, setNumber] = store.number;
    let [cinemaId, setCinemaId] = store.cinema_id;
    let [locations, setLocations] = store.locationArr;
    let [locationId, setLocationId] = store.location_id;
    let [msg, setMsg] = store.msg;
    let arr;
    let [close, setClose] = useState(false);
    let btnHide = useRef();
    let btnShow = useRef();
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
        viewCinemas();
        viewLocations();
    }, []);

    function viewCinemas() {
        let url = mainUrl + "/cinemas";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setCinemas(result);
                // setCinemaId(result[0]._id)
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
    function selLan(id) {
        arr = id
        console.log(id)
    };
    function edithCinema(i) {
        console.log(cinemas[i]);
        let item = cinemas[i];
        setName(item.name);
        setLocationId(item.location_id);
        // setImage(item.logo);
        setNumber(item.no_of_theater);
        setCinemaId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateCinema() {
        let item = { name, logo: image, no_of_theater: number, location_id: arr };
        let url = mainUrl + "/cinema/" + cinemaId;
        console.warn(cinemaId, item)

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
                viewCinemas();
            });
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    function deleteCinema(id) {
        if (window.confirm("are u sure")) {
            let url = mainUrl + "/cinema/" + id;

            fetch(url, {
                headers: {
                    'content-type': 'application/json'
                },
                method: "DELETE"
            })
                .then((res) => res.json())
                .then((result) => {
                    viewCinemas();
                });
        }
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
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" ref={btnHide}
                            style={{ display: "none" }}
                        >
                            <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                            <form>
                                <input type="text" placeholder="Name of Cinema" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="number" placeholder="Number of Theater" value={number} onChange={(e) => setNumber(e.target.value)} />
                                <button id="createBtn" type="button" onClick={() => updateCinema()}>Update</button>
                                <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                            </form>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}
                        ref={btnShow}
                        style={{ display: "block" }}
                    >
                        <h3>Cinemas</h3>
                        <div className="thead flex">
                            <div className="tcol">company</div>
                            <div className="tcol">cinema name</div>
                            <div className="tcol">No. of Theater</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {
                            cinemas.map((e, i) => {
                                if (e.company === cookie.company) {
                                    return (
                                        <CinemaView
                                            key={e._id}
                                            // company={e.company}
                                            cinemaName={e.name}
                                            numberOfTheaters={e.no_of_theater}
                                            editclick={() => edithCinema(i)}
                                            deleteclick={() => deleteCinema(e._id)}
                                        />
                                    )
                                } else if (cookie.dev === 'true') {
                                    return (
                                        <CinemaView
                                            key={e._id}
                                            company={e.company}
                                            created_by={e.created_by}
                                            cinemaName={e.name}
                                            numberOfTheaters={e.no_of_theater}
                                            editclick={() => edithCinema(i)}
                                            deleteclick={() => deleteCinema(e._id)}
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

export default ViewCinema;