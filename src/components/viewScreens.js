import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import AdminBar from "./AdminSidebar";
import ScreenView from "./screenProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewScreen() {
    let store = useContext(Store);
    let [screens, setScreens] = store.screenArr;
    let [theaters, setTheaters] = store.theaterArr;
    let [classes, setClasses] = store.classArr;
    let [classId, setClassId] = store.class_id;
    let [theaterId, setTheaterId] = store.theater_id;
    let [screenId, setScreenId] = store.screen_id;

    let [name, setName] = store.name;
    let [number, setNumber] = store.number;
    let [msg, setMsg] = store.msg;
    let teId;
    let clId;
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
        viewScreens();
        viewClass();
        viewTheater();
    }, []);

    function viewScreens() {
        let url = mainUrl + "/screens";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setScreens(result);
            });
    };
    function viewClass() {
        let url = mainUrl + "/classes";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setClasses(result);
                // console.log(result);
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
    };
    function ceId(id) {
        clId = id;
        console.log(id, "class")
    };
    function thId(id) {
        teId = id;
        console.log(id, "theater")
    };
    function editScreen(i) {
        console.log(screens[i]);
        let item = screens[i];
        setName(item.screen);
        setTheaterId(item.theater_id);
        setClassId(item.class_id);
        setNumber(item.no_of_seats);
        setScreenId(item._id);

        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateScreen() {
        let item = { screen: name, theater_id: teId, class_id: clId, no_of_seats: number };
        let url = mainUrl + "/screen/" + screenId;
        console.warn(screenId, url, item)

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
                viewScreens();
                btnHide.current.style.display = 'none';
                btnShow.current.style.display = 'block';
            });
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    let deleteScreen = (id) => {
        let url = mainUrl + "/screen/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => {
                alert("Operation Successful");
                viewScreens();
            });


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
                                    <input type="text" placeholder="Name of Screen" value={name} onChange={(e) => setName(e.target.value)} />
                                    <input type="number" placeholder="Number of Seats" value={number} onChange={(e) => setNumber(e.target.value)} />
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  Class
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            {classes.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => ceId(x._id)}>{x.name}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  Theater
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            {theaters.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => thId(x._id)}>{x.name}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button id="createBtn" type="button" onClick={() => updateScreen()}>Update</button>
                                    <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Screens</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">Theater Name</div>
                            <div className="tcol">Screen Name</div>
                            <div className="tcol">Number of Seats</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {screens.map((e, i) => {
                            if (e.company === cookie.company) {
                                return (
                                    <ScreenView
                                        key={e._id}
                                        theaterName={e.theaterName}
                                        screenName={e.screen}
                                        numberOfSeats={e.no_of_seats}
                                        classID={e.class_id}
                                        editclick={() => editScreen(i)}
                                        deleteclick={() => deleteScreen(e._id)}
                                    />
                                )
                            } else if (cookie.dev === 'true') {
                                return (
                                    <ScreenView
                                        key={e._id}
                                        theaterName={e.theaterName}
                                        screenName={e.screen}
                                        numberOfSeats={e.no_of_seats}
                                        classID={e.class_id}
                                        editclick={() => editScreen(i)}
                                        deleteclick={() => deleteScreen(e._id)}
                                    />
                                )
                            }
                        })}




                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewScreen;