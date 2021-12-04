import React, { useContext } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function CreateAboutUs() {
    let history = useHistory();
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [created_by, setCreated] = store.creating;
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
                <h3 id="create">Create AboutUs</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <form enctype="multipart/form-data" method="POST" action={mainUrl + "/about"} >
                        <input type="text" placeholder="Company" name="company" value={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input type="text" placeholder="Created By" name="created_by" value={created_by} className={'none'} required />
                        <input type="text" placeholder="name" name="name" />
                        <input type="text" placeholder="description" name="description" />
                        <div className="flex">
                            <label>Logo</label>
                            <input type="file" name="logo" required alt="" />
                        </div>
                        <button id="createBtn" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateAboutUs;