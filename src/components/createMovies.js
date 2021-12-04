import React, { useContext, useState } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function CreateMovie() {
    let store = useContext(Store);
    let [created_by, setCreated] = store.creating;
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [image, setImage] = store.image;
    let [msg, setMsg] = store.msg;
    let [title, setTitle] = store.title;
    let [synopsis, setSynopsis] = store.synopsis;
    let [link, setLink] = store.link;
    let [price, setPrice] = store.price;
    let [movieId, setMovieId] = store.movie_id;
    let [casts, setCasts] = useState('')
    let [running_time, setRun] = useState(null)
    let [rating, setRate] = useState(null)
    let [release_date, setRelease] = useState('')
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
                <h3 id="create">Create A New Movie</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form enctype="multipart/form-data" action={mainUrl + "/movie"} method="POST">
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" defaultValue={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by_id" value={cookie.id} className={'none'} required />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Movie Title" name="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" name="synopsis" placeholder="Movie Synopsis" name="synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" name="trailer_link" placeholder="YouTube trailer link" value={link} onChange={(e) => setLink(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" name="casts" placeholder="Casts" value={casts} onChange={(e) => setCasts(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="number" name="running_time" placeholder="Running_time" value={running_time} onChange={(e) => setRun(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="number" name="rating" placeholder="Rating" value={rating} onChange={(e) => setRate(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="date" name="release_date" placeholder="Release_date" value={release_date} onChange={(e) => setRelease(e.target.value)} />
                        <div className="flex">
                            <label>Movie Image</label>
                            <input style={{ color: "white", background: 'black' }} type="file" name="image"
                            />
                        </div>
                        <button id="createBtn">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateMovie;