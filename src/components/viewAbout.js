import React, { useEffect, useState, useRef, useContext } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import AboutView from "./aboutProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewAbout() {
    let store = useContext(Store);
    let [name, setName] = store.name;
    let [synopsis, setSynopsis] = store.synopsis;
    let [image, setImage] = store.image;
    let [aboutId, setAboutId] = useState(null);

    let history = useHistory();
    let [abouts, setAbouts] = useState([]);
    let btnShow = useRef();
    let btnHide = useRef();

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
        viewAbout();
    }, []);
    let viewAbout = () => {
        let url = mainUrl + "/abouts"
        fetch(url)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setAbouts(result);
            })
    }
    function editAbout(i) {
        console.log(abouts[i]);
        let item = abouts[i];
        setName(item.name);
        setSynopsis(item.description);
        // setImage(item.logo);
        setAboutId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateAbout() {
        let item = { name, description: synopsis, logo: image };
        let url = mainUrl + "/about/" + aboutId;
        console.log(item)
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
                // viewAbout();
                btnHide.current.style.display = 'none';
                btnShow.current.style.display = 'block';
            });
    };
    function deleteAbout(id) {
        let url = mainUrl + "/about/" + id;
        if (window.confirm('are u sure')) {
            fetch(url, {
                headers: {
                    'content-type': 'application/json'
                },
                method: "DELETE"
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    // viewAbout();
                    btnHide.current.style.display = 'none';
                    btnShow.current.style.display = 'block';
                });
        }
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };

    let [company, setCompany] = store.mainCompany;

    let getCompany = () => {
        let mainCompany = cookie.company;
        setCompany(mainCompany);
        console.log(company)
    };
    getCompany();
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
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }}>
                            <div>
                                <form>
                                    <input type="text" placeholder="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    <input type="text" placeholder="description" name="description" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                                    <input type="file" placeholder="Cinema Logo" name="logo" value={image} onChange={(e) => setImage(e.target.value)} />
                                    <button id="createBtn" type="button" onClick={() => updateAbout()}>Update</button>
                                    <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>


                                </form>
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px', display: "" }} ref={btnShow}>
                        <h3>Classes</h3>
                        <div className="thead flex">
                            <div className="tcol">Cinema name</div>
                            <div className="tcol">Cinema Description</div>
                            <div className="tcol">Cinema Logo</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {abouts.map((e, i) => {
                            if (e.company === cookie.company) {
                                return (
                                    <AboutView
                                        key={i}
                                        description={e.description}
                                        logo={e.logo}
                                        editclick={() => editAbout(i)}
                                        deleteclick={() => deleteAbout(e._id)}


                                    />
                                )
                            } else if (cookie.dev === 'true') {
                                return (
                                    <AboutView
                                        key={i}
                                        company={company}
                                        description={e.description}
                                        logo={e.logo}
                                        editclick={() => editAbout(i)}
                                        deleteclick={() => deleteAbout(e._id)}
                                    />
                                )
                            }
                        })
                        }


                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewAbout;