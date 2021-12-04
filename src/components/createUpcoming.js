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

function CreateUpcoming() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [cinemas, setCinemas] = store.cinemaArr;
    let [time, setTime] = store.time;
    let [title, setTitle] = store.title;
    let [date, setDate] = store.date;
    let [image, setImage] = store.image;

    let [msg, setMsg] = store.msg;
    let [cinemaID, setCinemaID] = useState('');

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
    getCompany();
    useEffect(() => {
        viewCinemas();
    }, []);
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
        setCinemaID(id)
        console.log(id, "cinema")
    };
    // function createUpcoming(id) {
    //     let url = " http://localhost:5100/upcoming";
    //     let data = { title, cinema_id: cId, showing_time: time, release_date: date, logo: image };
    //     console.log(data);
    //     fetch(url, {
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log(result);
    //             if (result.status === 'ok') {
    //                 // setLocationId(result.data._id);
    //                 // history.push("/login")
    //                 console.log("successfully");

    //             } else {
    //                 console.log('e no work')
    //                 console.log(result.error);
    //                 setMsg(result.error)
    //             }
    //         });
    // };

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
                <h3 id="create">Create Upcoming Movie</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form action={mainUrl + "/upcoming"} method="POST" encType="multipart/form-data">
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className={close} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={cookie.id} className={close} required />
                        <input style={{ color: "white", background: 'black' }} type="name" placeholder="Movie Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="time" placeholder="Time" name="showing_time" value={time} onChange={(e) => setTime(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="date" placeholder="Release Date" name="release_date" value={date} onChange={(e) => setDate(e.target.value)} />
                        {/* <input type="number" placeholder="Number of Screen" value={number} onChange={(e) => setNumber(e.target.value)} /> */}
                        <input style={{ color: "white", background: 'black' }} type="file" name="logo" />
                        {/* <Dropdown>
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
                        </Dropdown> */}
                        {/* <button id="createBtn" type="button" onClick={() => createUpcoming()}>Submit</button> */}
                        <button id="createBtn">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateUpcoming;