import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import { Link } from "react-router-dom";
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function ViewMovie() {
    let store = useContext(Store);
    let [movieId, setMovieId] = store.movie_id;
    let [movies, setMovies] = store.movieArr;
    let [image, setImage] = store.image;
    let [msg, setMsg] = store.msg;
    let [title, setTitle] = store.title;
    let [synopsis, setSynopsis] = store.synopsis;
    let [link, setLink] = store.link;
    let [price, setPrice] = store.price;
    let [close, setClose] = useState(false);
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
        viewMovies();
    }, []);

    function viewMovies() {
        let url = mainUrl + "/movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovies(result);
            });
    };
    function edithMovie(i) {
        // console.log(movies[i]);
        let item = movies[i];
        setTitle(item.title);
        setPrice(item.price);
        // setImage(item.image);
        setLink(item.trailer_link);
        setSynopsis(item.synopsis);
        setMovieId(item._id);

        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateMovie() {
        let item = { price, title, synopsis, image, trailer_link: link };
        let url = mainUrl + "/movie/" + movieId;
        console.warn(movieId, item)

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
                //  viewMovies();
            });
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';

        console.log(movieId)
    };
    function deleteMovie(id) {
        let url = mainUrl + "/movie/" + id;
        fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                //  viewMovies();
            });
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
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
                    <div className="editing">
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }}>
                            <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                            <form>
                                <input type="text" placeholder="Movie Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <input type="text" name="synopsis" placeholder="Movie Synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                                <input type="text" name="trailer" placeholder="YouTube trailer link" value={link} onChange={(e) => setLink(e.target.value)} />
                                <div className="flex">
                                    <label>Movie Image</label>
                                    <input type="file" value={image} onChange={(e) => setImage(e.target.value)} />
                                </div>
                                <button id="createBtn" type="button" onClick={() => updateMovie()}>Update</button>
                                <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                            </form>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Movies</h3>
                        <div className="thead flex">
                            <div className="tcol">Image</div>
                            <div className="tcol">Title</div>
                            <div className="tcol">Synopsis</div>
                            <div className="tcol">Trailer Link</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>
                        {movies.map((e, i) => {
                            if (e.company === cookie.company) {
                                return (
                                    <div className="thead flex" key={i}>
                                        <div className="tcol"><img src={"http://localhost:5100" + e.image} alt="" /></div>
                                        <div className="tcol">{e.title}</div>
                                        <div className="tcol">{e.synopsis}</div>
                                        <div className="tcol">{e.trailer_link}</div>
                                        <Link className="tcol1" onClick={() => edithMovie(i)}>edit</Link>
                                        <Link className="tcol1" onClick={() => deleteMovie(e._id)}>delete</Link>
                                    </div>
                                )
                            } else if (cookie.dev === "true") {
                                return (
                                    <div className="thead flex" key={i}>
                                        <div className="tcol">{e.company}</div>
                                        <div className="tcol"><img src={"http://localhost:5100" + e.image} alt="" /></div>
                                        <div className="tcol">{e.title}</div>
                                        <div className="tcol">{e.synopsis}</div>
                                        <div className="tcol">{e.trailer_link}</div>
                                        <Link className="tcol1" onClick={() => edithMovie(i)}>edit</Link>
                                        <Link className="tcol1" onClick={() => deleteMovie(e._id)}>delete</Link>
                                    </div>
                                )
                            }
                        })
                        }


                        {/* below here you map */}
                        {/* <AdminView /> */}



                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewMovie;