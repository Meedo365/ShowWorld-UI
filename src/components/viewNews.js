import React, { useContext, useEffect, useState, useRef } from "react";
import AdminBar from "./AdminSidebar";
import NewsView from "./newsProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewNews() {
    let store = useContext(Store)
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);
    let [news, setNews] = useState([]);
    let [headline, setHeadline] = useState("");
    let [news_body, setNewsBody] = useState("");
    let showEdit = useRef();
    let [newsID, setNewsID] = useState("")
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
        loadNews()
    }, [])
    let loadNews = () => {
        let url = mainUrl + "/news";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setNews(res)
            });
    };
    let editNews = (e, i) => {
        if (true) {
            let item = news[i];
            setHeadline(item.headline);
            setNewsBody(item.body);
            setNewsID(e)
        }

        showEdit.current.style.display = 'block'
    };
    let handleNewsUpdate = () => {
        let url = mainUrl + "/news/" + newsID;
        let items = {
            headline,
            body: news_body
        };
        console.log(items)
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
                loadNews();
            });
        showEdit.current.style.display = 'none'
    };
    let deleteNews = (id) => {
        let url = mainUrl + "/news/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadNews(); });


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
                        <div id="myeditUser" className="editform" ref={showEdit}>
                            <div>
                                <input type="text" placeholder="Headline" name="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                                <input type="text" placeholder="News Content" name="body" value={news_body} onChange={(e) => setNews(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update News" onClick={() => handleNewsUpdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>News</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">Headline</div>
                            <div className="tcol">News Body</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {news.map((e, i) => {
                            if (e.company === cookie.company) {
                                return <NewsView
                                    key={e._id}
                                    company={e.company}
                                    headline={e.headline}
                                    newsbody={e.body}
                                    editclick={() => editNews(e._id, i)}
                                    deleteclick={() => deleteNews(e._id)}
                                />
                            } else if (cookie.dev === 'true') {
                                return <NewsView
                                    key={e._id}
                                    company={e.company}
                                    headline={e.headline}
                                    newsbody={e.body}
                                    editclick={() => editNews(e._id, i)}
                                    deleteclick={() => deleteNews(e._id)}
                                />
                            }
                        })}




                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewNews;