import React, { useContext, useState, useEffect, useRef } from "react";
import { PaystackButton } from "react-paystack"
import { Store } from "../context/store";
import { Dropdown, FormCheck } from "react-bootstrap";
import AdminBar from "./AdminSidebar";
import BookingView from "./bookingProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewRevenue() {
    let store = useContext(Store);
    let [bookings, setBookings] = store.bookingArr;
    let [oneScreen, setOneScreen] = useState([]);
    let [userBooked, setUserBooked] = useState([]);
    let [screen_test, setScreen_test] = useState([]);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [amount, setAmount] = useState("")
    let [name, setName] = store.name;
    let [email, setEmail] = store.email;


    let [movieSchma, setMovieShema] = useState([]);
    let [locations, setLocations] = store.locationArr;
    let [movies, setMovies] = store.movieArr;
    let [classes, setClasses] = store.classArr;
    let [times, setTimes] = useState([]);
    let [time, setTime] = store.time;
    let [date, setDate] = store.date;
    let [scId, setScId] = useState(null);
    let [movieId, setMovieId] = store.movie_id
    let [locationId, setLocationId] = store.location_id
    let [userBookedId, setUserBookedId] = useState(null)


    let [loId, setLoId] = useState(null);
    let [tiId, setTiId] = useState(null);
    let [thId, setThId] = useState(null);
    let [clId, setClId] = useState(null);
    let [msg, setMsg] = store.msg;

    let history = useHistory();
    let [seat, setSeat] = useState(null)
    let n = 3;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const publicKey = "pk_test_332dac7ec4c199f3168acb3f6cb84050e526aeb9"
    let btnShow = useRef();
    let btnHide = useRef();
    let btnShow_ = useRef();
    let btnHide_ = useRef();
    let [mainUrl] = store.hosting;
    let [book, setBook] = store.ShowBook;

    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);
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
        viewBook();
    }, []);

    let viewBook = () => {
        let url = mainUrl + "/userbookeds";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setBook(result);
            });
    };


    let arr = [...Array(n)]
    console.log(arr)
    function check() {
        // console.log(e)
        let images = document.querySelectorAll('.img'); //vvip
        // let images = document.querySelectorAll('.img'); //vip
        // let images = document.querySelectorAll('.img'); //regular

        images.forEach((e, i) => {
            e.onclick = () => {
                e.style.border = "1px solid red";
                e.style.color = "red";

                e.style.disabled = "true";

                console.log(i)
            }
        })
    }
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
                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: " " }}>
                        <h3>Revenue</h3>
                        <div className="thead flex">
                            <div className="tcol">Username</div>
                            <div className="tcol">Movie name</div>
                            <div className="tcol">screen name</div>
                            <div className="tcol">show time</div>
                            <div className="tcol">show date</div>
                            <div className="tcol">Theater name</div>
                            <div className="tcol">Seat No.</div>
                            <div className="tcol">Total price</div>

                        </div>


                        {/* below here you map */}
                        {
                            book.map((e, i) => {
                                if (e.company.toLowerCase() === cookie.company.toLowerCase() && e.paidseat === true) {
                                    return (
                                        <div className="tbody ">
                                            <div className="trow flex" style={{ color: "#fff" }}>
                                                <div className="tcol">{e.user_id.username}</div>
                                                <div className="tcol">{e.movie_id.title}</div>
                                                <div className="tcol">{e.screen_id.screen}</div>
                                                <div className="tcol">{e.time_id.time}</div>
                                                <div className="tcol">{new Date(e.time_id.date).toDateString()}</div>
                                                <div className="tcol">{e.seatNo}</div>
                                                <div className="tcol">{e.prices}</div>
                                            </div>
                                        </div>
                                    )
                                } else if (cookie.dev === true && e.paidseat === true) {
                                    return (
                                        <div className="tbody" key={e._id}>
                                            <div className="trow flex" style={{ color: "#fff" }}>
                                                <div className="tcol">{e.company}</div>
                                                <div className="tcol">{e.user_id.username}</div>
                                                <div className="tcol">{e.movie_id.title}</div>
                                                <div className="tcol">{e.screen_id.screen}</div>
                                                <div className="tcol">{e.time_id.time}</div>
                                                <div className="tcol">{new Date(e.time_id.date).toDateString()}</div>
                                                <div className="tcol">{e.theater_id.name}</div>
                                                <div className="tcol">{e.location_id.country + " " + e.location_id.state + " " + e.location_id.city}</div>
                                                <div className="tcol">{e.time_id.price + e.price}</div>

                                            </div>
                                        </div>
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

export default ViewRevenue;