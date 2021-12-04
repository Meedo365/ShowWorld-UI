import React, { useContext, useEffect, useRef, useState } from "react";
import AdminBar from "./AdminSidebar";
import SocialView from "./socialProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewSocial() {
    let store = useContext(Store);
    let [classes, setClasses] = store.classArr;
    let [classId, setClassId] = store.class_id;
    let [igUrl, setIG] = useState('');
    let [fbUrl, setFB] = useState('');
    let [twitterUrl, setTW] = useState('');
    let [msg, setMsg] = store.msg;
    let btnHide = useRef();
    let btnShow = useRef();
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

    useEffect(() => {
        viewSocial();
    }, []);

    function viewSocial() {
        let url = mainUrl + "/socialmedias";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setClasses(result);
                console.log(result);
            });
    };
    function editSocial(i) {
        console.log(classes[i]);
        let item = classes[i];
        setIG(item.igUrl);
        setFB(item.fbUrl);
        setTW(item.twitterUrl);
        setClassId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateSocial() {
        let item = {
            igUrl,
            fbUrl,
            twitterUrl
        };
        let url = mainUrl + " /socialmedia/" + classId;
        console.warn(classId, url, item)

        fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(item)

        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                viewSocial();
                btnHide.current.style.display = 'none';
                btnShow.current.style.display = 'block';
            });
    };
    function deleteClass(id) {
        let url = mainUrl + "/socialmedia/" + id;
        if (window.confirm("are u sure")) {
            fetch(url, {
                headers: {
                    'content-type': 'application/json'
                },
                method: "DELETE",

            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    viewSocial();
                    btnHide.current.style.display = 'none';
                    btnShow.current.style.display = 'block';
                });
        }

    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    return <>
        <>
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
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" >
                            <div>
                                <input type="text" placeholder="Cinema ID" name="cinemaID" />
                                <input type="text" placeholder="IG URL" name="igUrl" />
                                <input type="text" placeholder="FB URL" name="fbUrl" />
                                <input type="text" placeholder="Twitter URL" name="twitterUrl" />
                                <input type="button" id="buttonUpdate" value="Update Social Media Accounts" />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Social Media Accounts</h3>
                        <div className="thead flex">
                            <div className="tcol">Cinema ID</div>
                            <div className="tcol">IG URL</div>
                            <div className="tcol">FB URL</div>
                            <div className="tcol">TWITTER URL</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        <SocialView />




                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewSocial;