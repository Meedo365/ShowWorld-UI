import React, { useContext } from "react";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Store } from "../context/store";
import { useCookies } from 'react-cookie';

function CreateUser() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [created_by, setCreated] = store.creating;
    let [close, setClose] = store.closing
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
                <h3 id="create">Create User</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <form method="POST" action={mainUrl + "/user"} >
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={created_by} className={'none'} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder=" Full Name" name="name" required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Username" name="username" />
                        <input style={{ color: "white", background: 'black' }} type="email" name="email" placeholder="Enter a Valid Email" />
                        <input style={{ color: "white", background: 'black' }} type="password" name="passwd" placeholder="Enter a Password" autoComplete />
                        {/* <div className="flex">
                            <label>Profile Pic</label>
                            <input type="file" />
                        </div> */}
                        <button id="createBtn">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateUser;