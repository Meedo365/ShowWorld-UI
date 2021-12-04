import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import NewsLetterView from "./newsletterProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewNewsLetter() {
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
    let [newsLetter, setNewsLetter] = useState([]);
    let [cinemaId, setCinemaID] = useState("");
    let [news_body, setNewsBody] = useState("");
    let showEdit = useRef();
    let [newsID, setNewsID] = useState("")

    useEffect(() => {
        loadNewsletter()
    }, [])
    let loadNewsletter = () => {
        let url = "http://localhost:5100/newsletter";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setNewsLetter(res)
            });
    };
    let editNewsLetter = (e, i) => {
        if (true) {
            let item = newsLetter[i];
            setCinemaID(item.cinemaId);
            setNewsBody(item.news_body);
            setNewsID(e)
        }

        showEdit.current.style.display = 'block'
    };
    let handleNewsUpdate = () => {
        let url = "http://localhost:5100/newsletter/" + newsID;
        let items = {
            cinemaId,
            news_body
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
                loadNewsletter();
            });
        showEdit.current.style.display = 'none'
    };
    let deleteNewsletter = (id) => {
        let url = "http://localhost:5100/newsletter/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadNewsletter(); });


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
                        <div id="myeditUser" className="editform" ref={showEdit}>
                            <div>
                                <input type="text" placeholder="Cinema ID" name="cinemaId" value={cinemaId} onChange={(e) => setCinemaID(e.target.value)} />
                                <input type="text" placeholder="News Content" name="news_body" value={news_body} onChange={(e) => setNewsBody(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update NewsLetter" onClick={() => handleNewsUpdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>NewsLetters</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">NewsLetter Content</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {newsLetter.map((e, i) => {
                            if (e.company === cookie.company) {
                                return <NewsLetterView
                                    key={e._id}
                                    company={e.company}
                                    news_body={e.news_body}
                                    editclick={() => editNewsLetter(e._id, i)}
                                    deleteclick={() => deleteNewsletter(e._id)}
                                />
                            } else if (cookie.dev === 'true') {
                                return <NewsLetterView
                                    key={e._id}
                                    company={e.company}
                                    news_body={e.news_body}
                                    editclick={() => editNewsLetter(e._id, i)}
                                    deleteclick={() => deleteNewsletter(e._id)}
                                />
                            }
                        })}





                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewNewsLetter;