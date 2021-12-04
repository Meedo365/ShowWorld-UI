import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../context/store";
import AdminBar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Main from "./mainSite";

function Movie() {
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
                setMovieId(result[0]._id);
                setMovies(result);
                // console.log(movieId);
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
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    return (
        <>


            <div className="top" >
                <div>

                </div>


            </div>
            <div style={{ 'display': 'flex' }}>
                <div  >
                    <AdminBar />
                    <WebAdminBar />
                    <TheaterAdminBar />
                    <CounterAdminBar />
                </div>

                <div className="movieecontent">

                    <div className="create_movie_btn">
                        <Link to="/createmovie"
                            style={{
                                'color': 'crimson', 'textDecoration': 'none', border: '2px solid #ccc', paddingTop: "5px", paddingLeft: "5px",
                                background: 'cornsilk', marginTop: "50px", borderRadius: '4px', height: "70px", width: "20%",
                            }}>
                            Create Movie
                        </Link>
                        <button className="loggout" onClick={() => handleLogOut()} style={{ marginLeft: "490px", marginTop: "40px", width: "20%", background: "cornsilk", color: "crimson", border: "none", borderRadius: "10px", height: "50px" }}> LOGOUT</button>
                    </div>

                    <div className="moviedetails" style={{ margin: '10px 0px 0px' }}>
                        {movies.map((e, i) => {
                            return (
                                <div className="" key={i}>
                                    <div className="moviezz"><img src={mainUrl + e.image} alt="" style={{ width: "100%", height: "190px" }} /></div>
                                    <div >{e.title}</div>
                                    <Link className="tcol1" onClick={() => edithMovie(i)}>Edit</Link>
                                    <Link className="tcol1" onClick={() => deleteMovie(e._id)}>Delete</Link>
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie;