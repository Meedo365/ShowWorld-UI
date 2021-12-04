import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Store } from "../context/store";
import AdminBar from '../components/AdminSidebar';
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import Adminpanel from "../components/adminpanel";
import moviess from "../Assets/moviebg.jfif"

function Index() {
    let store = useContext(Store);
    let [movieId, setMovieId] = store.movie_id;
    let [movies, setMovies] = store.movieArr;
    let [company, setCompany] = store.mainCompany;
    let [user, setUser] = useState([]);
    let [name, setName] = useState("");
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name', 'theater',
        'dev', 'counter']);

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
        viewMovies()
        loadUser();
    }, []);

    function viewMovies() {
        let url = " http://localhost:5100/movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovieId(result[0]._id);
                setMovies(result);
                // console.log(movieId);
            });
    };
    let loadUser = () => {
        let url = "http://localhost:5100/users";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setUser(res)
            });
    };
    return (
        <>
            <div className="adminholder flex">
                <div className="admins" >
                    <Adminpanel />
                    <WebAdminBar />
                    <TheaterAdminBar />
                    <CounterAdminBar />
                </div>
                <div className="adminindexx">
                    <div className="admindettails">
                        <h1>Dashboard</h1>
                        <button className="loggout" onClick={() => handleLogOut()}> LOGOUT</button>
                    </div>
                    <div className="adminwrrap flex">
                        <div className="addmin1">
                            <Link to="/movies" style={{ color: "crimson" }} >
                                <span class="material-icons">
                                    movie_creation
                                </span>
                            </Link>
                            <h5>Movies</h5>
                            <h6>7</h6>
                        </div>
                        <div className="addmin1">
                            <Link to="/users" style={{ color: "crimson" }}>
                                <span class="material-icons">
                                    account_circle
                                </span>
                            </Link>
                            <h5>Users</h5>
                            <h6>5</h6>
                        </div>

                        <div className="addmin1">
                            <Link to="/movieschedule" style={{ color: "crimson" }}
                            >
                                <span class="material-icons">
                                    schedule
                                </span>
                            </Link>

                            <h5>Schedule</h5>
                            <h6>3</h6>
                        </div>
                    </div>

                    <div className="tabbles"  >
                        <h2>Users</h2>
                        <div class="table-wrapper" >
                            <table class="fl-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>


                                    </tr>
                                </thead>
                                {user.map((e, i) => {
                                    if (i < 3) {
                                        return (

                                            <tbody key={i}>
                                                <tr >
                                                    <td>{e.name}</td>
                                                    <td>{e.username}</td>
                                                    <td>{e.email}</td>


                                                </tr>
                                            </tbody>
                                        )
                                    }
                                })
                                }
                            </table>
                        </div>





                    </div>
                    <div className="moviexx" style={{ marginTop: "-70px" }}>
                        <div className="tabbles"  >
                            <h2>Movies</h2>
                            <div class="table-wrapper" >
                                <table class="fl-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Release Date</th>
                                            <th>Trailer Link</th>


                                        </tr>
                                    </thead>
                                    {movies.map((e, i) => {
                                        if (i < 3) {
                                            return (

                                                <tbody key={i}>
                                                    <tr >
                                                        <td>{e.title}</td>
                                                        <td><img src={"http://localhost:5100" + e.image} /></td>
                                                        <td>{e.created_at}</td>


                                                    </tr>
                                                </tbody>
                                            )
                                        }
                                    })
                                    }
                                </table>
                            </div>





                        </div>
                    </div>



                </div>

            </div>
        </>
    );
}

export default Index;