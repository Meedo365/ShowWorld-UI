import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import LocationView from "./locationProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewLocation() {
    let store = useContext(Store);
    let history = useHistory();
    let [locationId, setLocationId] = store.location_id;
    let [locations, setLocations] = store.locationArr;
    let [country, setCountry] = store.country;
    let [city, setCity] = store.city;
    let [state, setState] = store.state;
    let [msg, setMsg] = store.msg;
    let [close, setClose] = useState(false);
    let btnHide = useRef();
    let btnShow = useRef();
    let [location_test, setLocation_test] = useState([]);
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
        viewLocations();
        // viewLocation();
    }, []);

    function viewLocations() {
        let url = mainUrl + "/locations";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                // setLocationId([result]);     
                setLocations(result);
                // console.log(locationId);
            });
    };
    // function viewLocation() {
    //     let url = "http://localhost:5100/theater/" + "61694c5d398c553baddea8ec";
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(result => {
    //             // console.log(result.theater[0])
    //             setLocation_test(result)
    //             // setLocations(result.theater);
    //             // console.log(result,locationId);
    //         });
    // };
    function edithLocation(i) {
        console.log(locations[i]);
        let item = locations[i];
        setCity(item.city);
        setCountry(item.country);
        // setImage(item.logo);
        setState(item.state);
        setLocationId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateLocation() {
        let item = { country, state, city };
        let url = mainUrl + "/location/" + locationId;
        console.warn(locationId, item)

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
                viewLocations();
            });
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
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
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }}>
                            <div>
                                <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                                <form>
                                    <input type="text" placeholder="Country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                                    <input type="text" placeholder="State" name="state" value={state} onChange={(e) => setState(e.target.value)} />
                                    <input type="text" placeholder="City" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                    <button id="createBtn" type="button" onClick={() => updateLocation()}>Update</button>
                                    <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Locations</h3>
                        <div className="thead flex">
                            <div className="tcol">company</div>
                            <div className="tcol">country</div>
                            <div className="tcol">state</div>
                            <div className="tcol">city</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {
                            locations.map((e, i) => {
                                if (e.company === cookie.company) {
                                    return (
                                        <LocationView
                                            key={e._id}
                                            country={e.country}
                                            state={e.state}
                                            city={e.city}
                                            editclick={() => edithLocation(i)}
                                        />
                                    )
                                } else if (cookie.dev === 'true') {
                                    return (
                                        <LocationView
                                            key={e._id}
                                            company={e.company}
                                            country={e.country}
                                            state={e.state}
                                            city={e.city}
                                            // city={e.city}
                                            // locId={e._id}
                                            editclick={() => edithLocation(i)}
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

export default ViewLocation;