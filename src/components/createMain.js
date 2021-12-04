import React, { useContext, useState } from "react";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";

function CreateMain() {
    let store = useContext(Store);
    let [created_by, setCreated] = store.creating;
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);
    let [siteName, setSiteName] = useState("");
    let [webId, setWebId] = useState("");
    let [keywords, setKeywords] = useState("");
    let [site_url, setSiteUrl] = useState("");
    let [logo, setLogo] = useState("");
    let [service_fee, setServiceFee] = useState("");


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
                <h3 id="create">Create Main Site Settings</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <form enctype="multipart/form-data" action={mainUrl + "/mainsites"} method="POST">
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" defaultValue={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by_id" value={cookie.id} className={'none'} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Site Name" name="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Admin Mail ID" name="webadmin_id" value={webId} onChange={(e) => setWebId(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Keywords - Description" name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                        {/* <input style={{ color: "white", background: 'black' }} type="text" placeholder="Site URL" name="site_url" value={site_url} onChange={(e) => setSiteUrl(e.target.value)} /> */}
                        <input style={{ color: "white", background: 'black' }} type="number" placeholder="Service Fee" name="service_fee" value={service_fee} onChange={(e) => setServiceFee(e.target.value)} />
                        <div className="flex">
                            <label>Site Logo</label>
                            <input style={{ color: "white", background: 'black' }} type="file" name="logo" required alt="" />
                        </div>
                        <button id="createBtn">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateMain;