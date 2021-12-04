import React, { useContext } from "react";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";

function CreateLocation() {
    let store = useContext(Store);
    let [created_by, setCreated] = store.creating;
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [country, setCountry] = store.country;
    let [city, setCity] = store.city;
    let [state, setState] = store.state;
    let [locationId, setLocationId] = store.location_id;
    let [msg, setMsg] = store.msg;
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
    function createLocation() {
        let url = mainUrl + "/location";
        let data = { company, created_by, country, state, city };
        // console.log(data);
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 'ok') {
                    setLocationId(result.data._id);
                    console.log(locationId);
                    console.log(result);
                    setCountry('');
                    setCity('');
                    setState('');
                    alert('Location Created');
                } else {
                    console.log(result.error);
                    setMsg(result.error)
                }
            });
    }
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
                <h3 id="create">Create New Location</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form>
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={created_by} className={'none'} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="State" name="state" value={state} onChange={(e) => setState(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="City" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        <button id="createBtn" type="button" onClick={() => createLocation()}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateLocation;