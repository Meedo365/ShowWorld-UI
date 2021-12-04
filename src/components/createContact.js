import React, { useContext } from "react";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";

function CreateContact() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
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
        let dev = cookie.dev;
        if (dev == 'true') {
            setClose('');
        } else {
            setClose('none');
            setCompany(mainCompany)
        }
    };
    getCompany();
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
                <h3 id="create">Create Contact</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <form method="POST" action={mainUrl + "/contacts"}>
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" defaultValue={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={cookie.id} className={'none'} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Cinema Phone" name="phone" />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Cinema Email" name="email" />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Cinema Address" name="address" />
                        <button id="createBtn">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateContact;