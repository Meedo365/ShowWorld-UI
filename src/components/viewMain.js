import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import MainView from "./mainSiteProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar'; import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewMain() {
    let store = useContext(Store)
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
    let [main, setMain] = useState([]);
    let [cinemaID, setCinemaID] = useState("");
    let [description, setDescription] = useState("");

    let [siteName, setSiteName] = useState("");
    let [webId, setWebId] = useState("");
    let [keywords, setKeywords] = useState("");
    let [site_url, setSiteUrl] = useState("");
    let [logo, setLogo] = useState("");
    let [service_fee, setServiceFee] = useState("");

    let showEdit = useRef();
    let [mainID, setMainID] = useState("")

    useEffect(() => {
        loadMain()
    }, [])
    let loadMain = () => {
        let url = mainUrl + "/mainsites";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setMain(res)
            });
    }
    let editMain = (e, i) => {
        if (true) {
            let item = main[i];
            setSiteName(item.siteName);
            setWebId(item.webadmin_id);
            setKeywords(item.keywords);
            // setSiteUrl(item.site_url);
            setLogo(item.logo);
            setServiceFee(item.service_fee);
            setMainID(e)
        }

        showEdit.current.style.display = 'block'
    }
    let handleMainUpdate = () => {
        let url = mainUrl + "/site-settings/" + mainID;
        let items = {
            siteName,
            webId,
            keywords,
            // site_url,
            logo,
            service_fee
        };
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(items)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                loadMain();
            });
        showEdit.current.style.display = 'none'
    }
    let deleteMain = (id) => {
        let url = mainUrl + "/site-settings/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadMain(); });


    };


    return <>
        <> <div>
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
                        <div id="myeditUser" className="editform" ref={showEdit}>
                            <div>
                                <input type="text" placeholder="Site Name" name="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                                <input type="text" placeholder="Admin Mail ID" name="webadmin_id" value={webId} onChange={(e) => setWebId(e.target.value)} />
                                <input type="text" placeholder="Keywords & Description" name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                                {/* <input type="text" placeholder="Site URL" name="site_url" value={site_url} onChange={(e) => setSiteUrl(e.target.value)} /> */}
                                <input type="image" placeholder="Logo" name="logo" value={logo} onChange={(e) => setLogo(e.target.value)} />
                                <input type="number" placeholder="Service Fee" name="service_fee" value={service_fee} onChange={(e) => setServiceFee(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update Main Site" onClick={() => handleMainUpdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Main Site Settings</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">Site Name</div>
                            <div className="tcol">Admin Mail ID</div>
                            <div className="tcol">Keywords & Description</div>
                            {/* <div className="tcol">Site URL</div> */}
                            <div className="tcol">LOGO</div>
                            <div className="tcol">Service Fee</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {main.map((e, i) => {
                            if (e.company === cookie.company) {
                                return <MainView
                                    key={e._id}
                                    siteName={e.siteName}
                                    admin_mail_id={e.webadmin_id}
                                    keywords={e.keywords}
                                    // site_url={e.site_url}
                                    logo={e.logo}
                                    service_fee={e.service_fee}
                                    editclick={() => editMain(e._id, i)}
                                    deleteclick={() => deleteMain(e._id)}
                                />
                            } else if (cookie.dev === 'true') {
                                return <MainView
                                    key={e._id}
                                    company={e.company}
                                    siteName={e.siteName}
                                    admin_mail_id={e.webadmin_id}
                                    keywords={e.keywords}
                                    // site_url={e.site_url}
                                    logo={e.logo}
                                    service_fee={e.service_fee}
                                    editclick={() => editMain(e._id, i)}
                                    deleteclick={() => deleteMain(e._id)}
                                />
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    </>
}

export default ViewMain;