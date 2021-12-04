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

function CreateScreen() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [created_by, setCreated] = store.creating;
    let [theaters, setTheaters] = store.theaterArr;
    let [classes, setClasses] = store.classArr;
    let [name, setName] = store.name;
    let [number, setNumber] = store.number;
    let [msg, setMsg] = store.msg;
    let [totalSeat, setTotalSeat] = useState(null);
    let [vvip, setVvip] = useState(null);
    let [vip, setVip] = useState(null);
    let [regular, setRegular] = useState(null);


    let teId;
    let clId;
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
        viewTheater();
        viewClass();

    }, []);
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
    function blurRegular() {
        let x = (parseInt(vvip) + parseInt(vip));
        setRegular(number - x)
        console.log(regular);
    }
    function createScreen(id) {
        let url = mainUrl + "/screen";
        let data = { company, created_by, screen: name, theater_id: teId, class_id: clId, no_of_seats: number, vvip, vip, regular };
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
                    alert('Successful')
                    setName("")
                    setNumber("")
                    setVvip("")
                    setVvip('')
                    setVip('')
                    setRegular('')
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
                <h3 id="create">Create New Screen</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form>
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className={close} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={cookie.id} className={close} required />
                        <input style={{ color: "white", background: 'black' }} type="name" placeholder="Name of Screen" value={name} onChange={(e) => setName(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="number" placeholder="Total Seats" value={number} onChange={(e) => setNumber(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="number" placeholder="Number of vvip" value={vvip} onChange={(e) => setVvip(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="number" placeholder="Number of vip" value={vip} onBlur={() => blurRegular()} onChange={(e) => setVip(e.target.value)} />
                        <label >Regular</label>
                        <input style={{ color: "white", background: 'black' }} type="number" placeholder="Number of regular" value={regular} onChange={(e) => setRegular(e.target.value)} readOnly />
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Theater
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {theaters.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => thId(x._id)}>{x.name}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === 'true') {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => thId(x._id)}>{x.company}---{x.name}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <button id="createBtn" type="button" onClick={() => createScreen()}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateScreen;