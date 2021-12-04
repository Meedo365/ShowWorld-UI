import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import BannerView from "./bannerProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewBanner() {
    let store = useContext(Store)
    let history = useHistory();
    let [cookie, setCookies, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
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
    let [banner, setBanner] = useState([]);
    let [cinemaID, setCinemaID] = useState("");
    let [url, setUrl] = useState("");
    let showEdit = useRef();
    let [bannerID, setBannerID] = useState("")



    useEffect(() => {
        loadBanner()
    }, [])
    let loadBanner = () => {
        let url = mainUrl + "/banner";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setBanner(res)
            });
    };
    let editBanner = (e, i) => {
        if (true) {
            let item = banner[i];
            setCinemaID(item.cinemaID);
            setUrl(item.url);
            setBannerID(e)
        }
        showEdit.current.style.display = 'block'
    };
    let handleBannerUpdate = () => {
        let url = mainUrl + "/banner/" + bannerID;
        let items = {
            cinemaID,
            url
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
                loadBanner();
            });
        showEdit.current.style.display = 'none'
    };
    let deleteBanner = (id) => {
        let url = mainUrl + "/banner/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadBanner(); });


    };


    return <>
        <div>
            <h2 id="logout" onClick={() => handleLogOut()}>LOGOUT</h2>
        </div>
        <>
            <div className="flex" style={{ 'padding': '100px' }}>
                <div className="adminMain" >
                    <AdminBar />
                    <WebAdminBar />
                    <TheaterAdminBar />
                    <CounterAdminBar />
                </div>

                <div className="adminBody">
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" ref={showEdit} >
                            <div>
                                <input type="text" placeholder="Cinema ID" name="cinemaID" value={cinemaID} onChange={(e) => setCinemaID(e.target.value)} />
                                <div className="flex">
                                    <label>Banner File</label>
                                    {/* <input type="file" placeholder="Banner URL" name="url" required value={url} onChange={(e) => setUrl(e.target.value)} alt=""/> */}
                                    <input type="text" placeholder="Banner URL" name="url" required value={url} onChange={(e) => setUrl(e.target.value)} alt="" />
                                </div>
                                <input type="button" id="buttonUpdate" value="Update Banner" onClick={() => handleBannerUpdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Banners</h3>
                        <div className="thead flex">
                            <div className="tcol">Cinema ID</div>
                            <div className="tcol">Banner URL</div>
                            <div className="tcol">Image</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {banner.map((e, i) => {
                            if (e.company === cookie.company) {
                                return <BannerView
                                    key={e._id}
                                    created_by={e.created_by}
                                    url={e.url}
                                    editclick={() => editBanner(e._id, i)}
                                    deleteclick={() => deleteBanner(e._id)}
                                />
                            } else if (cookie.dev === 'true') {
                                return <BannerView
                                    key={e._id}
                                    company={e.company}
                                    created_by={e.created_by}
                                    url={e.url}
                                    editclick={() => editBanner(e._id, i)}
                                    deleteclick={() => deleteBanner(e._id)}
                                />
                            }

                        })}





                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewBanner;