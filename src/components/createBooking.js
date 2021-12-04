import React, { useContext, useState, useEffect, useRef } from "react";
import AdminBar from "./AdminSidebar";
import { Store } from "../context/store";
import { Dropdown, Modal } from "react-bootstrap";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function CreateBooking() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [created_by, setCreated] = store.creating;
    let [theaters, setTheaters] = store.theaterArr;
    let [screens, setScreens] = store.screenArr;
    let [movies, setMovies] = store.movieArr;
    const [lgShow, setLgShow] = useState(false);
    let [vvip, setVvip] = useState(null);
    let [vip, setVip] = useState(null);
    let [regular, setRegular] = useState(null);
    let [locations, setLocations] = store.locationArr;
    let [times, setTimes] = useState([]);
    let [time, setTime] = store.time;
    let [date, setDate] = store.date;
    let [msg, setMsg] = store.msg;
    let [price, setPrice] = useState(null);
    let [timePrice, setTimePrice] = useState(null);

    let row = useState()
    let [movieSchma, setMovieShema] = useState([]);
    let [classes, setClasses] = useState([]);
    let [classPrice, setClassPrice] = useState(null);
    let [scId, setScId] = useState(null);
    let [movieId, setMovieId] = store.movie_id
    let [loId, setLoId] = useState(null);
    let [tiId, setTiId] = useState(null);
    let [thId, setThId] = useState(null);
    let [clId, setClId] = useState(null);
    let [seatNo, SetSeat] = useState(null);
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

    useEffect(() => {
        viewMovies();
        viewClass();
    }, []);

    function viewClass() {
        let url = mainUrl + "/classes";
        fetch(url)
            .then(res => res.json())
            .then((result) => {

                for (let i = 0; i < result.length; i++) {
                    if (result[i].company == cookie.company) {
                        // console.log(result[i].price)

                    }
                }
                setClasses(result)
            });
    };
    function viewMovies(id) {
        let url = mainUrl + " /movies";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setMovies(result);
            });
    };
    function viewTheater() {
        let url = mainUrl + "/theaters";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setTheaters(result);
                // console.log(result);
            });
    }
    function viewLocations() {
        let url = mainUrl + "/locations";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setLocations(result);
            });
    };
    // movie
    function movId(id) {
        setMovieId(id)
        let urls = mainUrl + " /movieschedule/" + id;
        fetch(urls)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setMovieShema(result);
                // theId(id);
                // console.log(result,"booked schema for one movie")
            });
        console.log(id, "movie")
    };
    // time id
    function timId(id, price) {
        setTiId(id);
        // setPrice(price);
        setTimePrice(price)
        console.log(id, "time")
    };
    // screen
    function scrId(id, vvip, vip, regular) {
        setScId(id);
        setVvip(vvip);
        setVip(vip);
        setRegular(regular);
        console.log(id, "screen");
        modelOpen();
    };
    // console.log(vvip, vip, regular)

    let seat_vvip = [...Array(vvip)]
    let seat_vip = [...Array(vip)]
    let seat_regular = [...Array(regular)]

    function vvipFunc(e) {

        let vvip_images = document.querySelectorAll('.vvip'); //vvip
        // vvip section
        vvip_images.forEach((e, i) => {
            e.onclick = () => {
                e.style.border = "1px solid red";
                e.disabled = "true";
                e.style.fill = "red";
                setPrice(e.getAttribute('value'));
                // setPrice(price * 3)
                SetSeat(i)
                console.log(i)
            }
        })

    };

    function vipFunc(e) {
        let vip_images = document.querySelectorAll('.vip'); //vip
        //vip section
        vip_images.forEach((e, i) => {
            e.onclick = () => {
                e.style.border = "1px solid green";
                e.style.fill = "red";
                e.style.disabled = "true";
                // setPrice(price * 2)
                setPrice(e.getAttribute('value'));
                SetSeat(i)

            }
        })
    };
    function regularFunc(e) {
        let regular_images = document.querySelectorAll('.regular'); //regular
        //regular section
        regular_images.forEach((e, i) => {
            e.onclick = () => {
                e.style.border = "1px solid blue";
                e.style.color = "red";
                e.style.disabled = "true";
                // setPrice(price * 1)
                setPrice(e.getAttribute('value'));
                SetSeat(i)
                // console.log(i)
            }
        })
    };
    function modelOpen() {
        setLgShow(true);
    };
    // class id
    function claId(id) {
        setClId(id)
        console.log(id, "class")
    };
    // location id
    function locId(id, idx) {
        setThId(id);
        setLoId(idx)
        console.log(id, "theater", idx, "location", price)
    };
    function createBooking() {
        let url = mainUrl + "/userbooked";
        let prices = parseInt(price) + timePrice;

        let data = {
            created_by, company, movie_id: movieId, time_id: tiId, location_id: loId, theater_id: thId,
            screen_id: scId, user_id: cookie.id, prices, seatNo
        };

        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result, "success");
                if (result.status === 'ok') {
                    // history.push("/login")
                    console.log("successfully");

                } else {
                    // console.log('error');
                    setMsg(result.error)
                }
            });
    };

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
                <h3 id="create">Create New Booking</h3>
                <div className="editform">
                    <h3>Details</h3>
                    <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                    <form>
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className={close} onChange={(e) => setCompany(e.target.value)} />
                        <input style={{ color: "white", background: 'black' }} type="text" placeholder="Created By" name="created_by" value={created_by} className={'none'} required />
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Movie
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movies.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => movId(x._id)}>{x.title}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === 'true') {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => movId(x._id)}>{x.company}--{x.title}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Time
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movieSchma.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => timId(x.time_id._id, x.time_id.price)} >{x.time_id.time},
                                                    {x.time_id.date},${x.time_id.price}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === 'true') {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => timId(x.time_id._id, x.time_id.price,)}>{x.company}---{x.time_id.time},
                                                    {x.time_id.date},${x.time_id.price}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Screen
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movieSchma.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => scrId(x.screen_id._id, x.screen_id.vvip, x.screen_id.vip, x.screen_id.regular)}>{x.screen_id.screen}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === 'true') {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => scrId(x.screen_id._id, x.screen_id.vvip, x.screen_id.vip, x.screen_id.regular)}>{x.company}---{x.screen_id.screen}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>

                            <Dropdown.Toggle id="dropdown-basic" style={{ width: "23.8rem", borderRadius: "1px", marginTop: "5px", color: "#fff", backgroundColor: 'black', border: 'none' }}>
                                Select  Theater
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {movieSchma.map(x => {
                                    if (x.company === cookie.company) {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => locId(x.theater_id._id, x.location_id._id)} >{x.theater_id.name},{x.location_id.state}</Dropdown.Item>
                                            </div>
                                        )
                                    } else if (cookie.dev === 'true') {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => locId(x.theater_id._id, x.location_id._id)} >{x.company}---{x.theater_id.name},{x.location_id.state}</Dropdown.Item>
                                            </div>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div id='row' ref={row}></div>

                        <button id="createBtn" type="button" onClick={() => createBooking()}>Submit</button>
                    </form>
                </div>

                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Large Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}> VVIP SECTION</h1>
                        <section className="seat_div">
                            {seat_vvip.map((e, i) => {
                                return (
                                    <div key={i} >
                                        {/* {classes.map((a, i) => {
                                            console.log(a.price,i) */}

                                        < img id="seat" value={1000} className="vvip" onClick={() => vvipFunc(e)} style={{ display: "inlineFlex" }}
                                            src="https://icon-library.com/images/seat-icon/seat-icon-13.jpg" />

                                    </div>
                                )
                            })}
                        </section>
                        <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>VIP SECTION</h1>
                        <section className="seat_div">

                            {seat_vip.map((e, i) => {
                                return (
                                    <div key={i} className="seat_div">
                                        <img value={700} id="seat" className="vip" onClick={() => vipFunc(e)} style={{ color: "#fff" }}
                                            src="https://www.svgrepo.com/show/204084/chair-seat.svg" />

                                    </div>
                                )
                            })}
                        </section>

                        <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>REGULAR SECTION</h1>
                        <section className="seat_div">

                            {seat_regular.map((e, i) => {
                                return (
                                    <div key={i} className="seat_div">
                                        <img value={200} id="seat" className="regular" onClick={() => regularFunc(e)} style={{ color: "#fff" }}
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyvFpWaYEkS_ddADtCvv6vJerNIkjSgHF1_SEFZ0eSC5oDTFY_LQ6gA3roP7wWkyTI3k&usqp=CAU" />
                                    </div>
                                )
                            })}
                        </section>

                    </Modal.Body>
                </Modal>

            </div>
        </div>
    </>
}

export default CreateBooking;