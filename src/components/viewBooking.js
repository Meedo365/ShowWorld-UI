import React, { useContext, useState, useEffect, useRef } from "react";
import { PaystackButton } from "react-paystack";
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


function ViewBooking() {
    let store = useContext(Store);
    let [created_by, setCreated] = store.creating;
    let [company, setCompany] = store.mainCompany;
    let [bookings, setBookings] = store.bookingArr;
    let [oneScreen, setOneScreen] = useState([]);
    let [userBooked, setUserBooked] = useState([]);
    let [screen_test, setScreen_test] = useState([]);
    let [close, setClose] = store.closing;
    let [amount, setAmount] = useState(null);
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

    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);

    let getCompany = () => {
        let mainCompany = cookie.company;
        let id = cookie.id;
        let dev = cookie.dev;
        if (dev == 'true') {
            setClose('');
            setCompany("")
            setCreated(id);
        } else {
            setClose('none');
            setCompany(mainCompany);
            setCreated(id);
        }
    };
    getCompany();

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
        // viewBookings();
        viewUserBooked();
        viewMovies();
    }, []);

    function viewUserBooked() {
        let url = mainUrl + "/userbookeds";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setBookings(result);
            });
    };
    function viewMovies() {
        let url = mainUrl + " /movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovies(result);
            });
    }
    function viewOneUserBooked() {
        alert("yes")
        let url = mainUrl + "/userbooked/" + cookie.id;
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(result => {
                console.log(result, "one");
                // setBookings(result);
                // console.log(result[0].movies_schedule_id.movie_id);

            });

    };
    // movie
    function movId(id) {
        setMovieId(id)
        let urls = mainUrl + "/movieschedule/" + id;
        fetch(urls)
            .then(res => res.json())
            .then(result => {
                setMovieShema(result);
                theId(id);
                // console.log(result,"booked schema for one movie")
            });
        console.log(id, "movie")
    };
    function theId(id,) {
        // alert("yes")
        let urls = mainUrl + "/theater/" + id;
        console.log(id)

        fetch(urls)
            .then(res => res.json())
            .then(result => {
                setLocations(result)
                // console.log(result)
                //   setLoId(id)
                //   setThId(id)

                console.log(result, "booked schema for one movie and location and theater")
            });
        // console.log(id,thid, "theaters id")
    }
    // screen
    function scrId(id) {
        setScId(id)
        console.log(id, "screen")
    };

    // location id
    function locId(id, idx) {
        setThId(id);
        setLoId(idx)
        console.log(id, "theater", idx, "location")
    };
    // theater

    // time id
    function timId(id) {
        setTiId(id)
        console.log(id, "time")
    };
    function editUserBooked(i) {
        console.log(bookings[i]);
        let item = bookings[i];
        // setName(item.class_id.name);
        // setLocationId(item.location_id._id);
        // setImage(item.logo);
        // setNumber(item.no_of_theater);
        setUserBookedId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateUserBooked() {
        let item = { movie_id: movieId, time_id: tiId, location_id: loId, theater_id: thId, screen_id: scId, user_id: cookie.id };
        let url = mainUrl + "/userbooked/" + userBookedId;
        console.warn(userBookedId, item)

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
                viewUserBooked();
            });
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
    };
    let payUserBooked = (id, prices, movie_name, time, date, movie_id, time_id) => {
        let item = { userbooked_id: id, user_id: cookie.id, movie_id, time_id };
        let url = mainUrl + "/ticketbooking";
        console.warn(id)
        fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(item)

        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTime(time);
                setDate(date);
                setAmount(prices * 100);
                setEmail(result.user_id.email);
                setName(result.user_id.username);
                setMovieId(movie_name);
                console.log("payment successful", movieId, amount);
                // btnShow_.current.style.display = "none";
                // btnHide_.current.style.display = "block";
                // viewUserBooked();
            });
        console.log(amount)
    };

    let pay = () => {
        // let url = " http://localhost:5100/revenues";

        // let data = {
        //     created_by, company, movie_id: movieId, time_id: tiId, location_id: loId, theater_id: thId,
        //     screen_id: scId, user_id: cookie.id, amount
        // };

        // fetch(url, {
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     method: "POST",
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(result, "success");
        //         if (result.status === 'ok') {
        //             // history.push("/login")
        //             console.log("successfully");

        //         } else {
        //             alert('error');
        //             setMsg(result.error)
        //         }
        //     });
        alert('successful')
    };

    const componentProps = {
        email,
        amount,
        metadata: {
            name
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>
            alert("Thanks for doing business with us! Come back soon!!"),
        onSuccess: () => pay(),
        onClose: () => alert("Wait! Don't leave :("),
    };
    function deleteUerBooked(id) {
        if (window.confirm("are u sure")) {
            let url = mainUrl + "/userbooked/" + id;

            fetch(url, {
                headers: {
                    'content-type': 'application/json'
                },
                method: "DELETE"
            })
                .then((res) => res.json())
                .then((result) => {
                    viewUserBooked();
                });
        }
    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
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
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }} >
                            <div>
                                <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                                <form>
                                    <input type="text" placeholder="Company" name="company" value={company} className={close} required />
                                    <input type="text" placeholder="Created By" name="created_by" value={cookie.id} className={close} required />
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  Movie
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            {movies.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => movId(x._id)}>{x.title}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  Time
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {movieSchma.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => timId(x.time_id._id)}>{x.time_id.time},
                                                            {x.time_id.date},${x.time_id.price}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  Screen
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            {movieSchma.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => scrId(x.screen_id._id)}>{x.screen_id.screen}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown>

                                        <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff" }}>
                                            Select  theater
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            {movieSchma.map(x => {
                                                return (
                                                    <div key={x._id}>
                                                        <Dropdown.Item onClick={() => locId(x.theater_id._id, x.location_id._id)} >{x.theater_id.name},{x.location_id.state}</Dropdown.Item>
                                                    </div>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>


                                    <button id="createBtn" type="button" onClick={() => updateUserBooked()}>Submit</button>
                                    <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: " " }}>
                        <h3>Bookings</h3>
                        <div className="thead flex">
                            <div className="tcol">Username</div>
                            <div className="tcol">Movie name</div>
                            <div className="tcol">screen name</div>
                            <div className="tcol">show time</div>
                            <div className="tcol">show date</div>
                            <div className="tcol">Theater name</div>
                            <div className="tcol">Seat No.</div>
                            <div className="tcol">Total price</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">view by user</div>
                            <div className="tcol1">delete</div>
                            <div className="tcol1">pay</div>

                        </div>


                        {/* below here you map */}
                        {
                            bookings.map((e, i) => {
                                if (e.company.toLowerCase() === cookie.company.toLowerCase() && e.paidseat === false) {
                                    return (
                                        <div className="tbody ">
                                            <div className="trow flex" style={{ color: "#fff" }}>
                                                {/* <div className="tcol">{e.company}</div>
                                            <div className="tcol">{e.created_by}</div> */}
                                                {/* <div className="tcol">{e.user_id.username}</div> */}
                                                <div className="tcol">{e.movie_id.title}</div>
                                                <div className="tcol">{e.screen_id.screen}</div>
                                                <div className="tcol">{e.time_id.time}</div>
                                                <div className="tcol">{new Date(e.time_id.date).toDateString()}</div>
                                                {/* <div className="tcol">{e.theater_id.name}</div> */}
                                                <div className="tcol">{e.seatNo}</div>
                                                <div className="tcol">{e.prices}</div>
                                                <button type="button" className="tcol1" onClick={() => editUserBooked(i)}>edit</button>
                                                <button type="button" className="tcol1" onClick={() => viewOneUserBooked()}>view one</button>
                                                <button type="button" className="tcol1" onClick={() => deleteUerBooked(e._id)}>delete</button>
                                                <button type="button" className="tcol1" ref={btnShow_} style={{ display: "" }}
                                                    onClick={() => payUserBooked(e._id, e.prices, e.movie_id.title, e.time_id.time,
                                                        e.time_id.date, e.movie_id._id)}>book ticket
                                                </button>
                                                <PaystackButton
                                                    ref={btnHide_} style={{ display: "none" }} className="payBtn"
                                                    {...componentProps} />
                                            </div>
                                        </div>
                                    )
                                } else if (cookie.dev === true && e.paidseat === false) {
                                    return (
                                        <div className="tbody" key={e._id}>
                                            <div className="trow flex" style={{ color: "#fff" }}>
                                                <div className="tcol">{e.company}</div>
                                                {/* <div className="tcol">{e.created_by}</div> */}
                                                {/* <div className="tcol">{e.user_id.username}</div> */}
                                                <div className="tcol">{e.movie_id.title}</div>
                                                <div className="tcol">{e.screen_id.screen}</div>
                                                <div className="tcol">{e.time_id.time}</div>
                                                <div className="tcol">{new Date(e.time_id.date).toDateString()}</div>
                                                <div className="tcol">{e.theater_id.name}</div>
                                                <div className="tcol">{e.seatNo}</div>
                                                <div className="tcol">{e.prices}</div>
                                                <button type="button" className="tcol1" onClick={() => editUserBooked(i)}>edit</button>
                                                <button type="button" className="tcol1" onClick={() => viewOneUserBooked()}>view one</button>
                                                <button type="button" className="tcol1" onClick={() => deleteUerBooked(e._id)}>delete</button>
                                                <button type="button" className="tcol1" ref={btnShow_} style={{ display: "" }}
                                                    onClick={() => payUserBooked(e._id, e.prices, e.movie_id.title, e.time_id.time,
                                                        e.time_id.date, e.movie_id._id, e.time_id._id)}>book ticket</button>
                                                <button ref={btnHide_} style={{ display: "", fontSize: "10px" }} disabled>
                                                    <PaystackButton  {...componentProps} /></button>
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

export default ViewBooking;