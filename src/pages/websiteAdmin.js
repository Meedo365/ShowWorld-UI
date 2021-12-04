import React, { useContext } from "react";
import AdminBar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Adminpanel from "../components/adminpanel";
import { Store } from "../context/store";

function WebsiteAdmin() {
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);

    let store = useContext(Store);
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
    return <>
        
        <div className="flex" >
            <div className="admins" >
                <AdminBar />
                <WebAdminBar />
                <TheaterAdminBar />
                <CounterAdminBar />
            </div>
           
            <div>
            <div>
            <h6 id="logout" onClick={() => handleLogOut()}>LOGOUT</h6>
        </div>
                <div className="flex">
               
                    <div className="flex box">
                        <Link to="/createwebadmin" style={{ 'color': 'black', 'textDecoration': 'none' }}>
                            <h5> Create Website Admin</h5>
                        </Link>
                    </div>

                    <div className="flex box">
                        <Link to="/viewwebadmin" style={{ 'color': 'black', 'textDecoration': 'none' }}>
                            <h5> View Website Admins</h5>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default WebsiteAdmin;