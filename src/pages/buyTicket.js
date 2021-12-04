import React, { useEffect, useState, useContext } from 'react';
import DateShowings from '../components/dateShowing';
import MovieShowings from '../components/movies_showing';
import TimeShow from '../components/time_show';
import Nav from "../components/Nav";
import { Store } from "../context/store";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import { useCookies } from 'react-cookie';
import { Dropdown } from "react-bootstrap";
import NoMovieShowing from '../components/noMovie';


function BuyTicket() {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [schedule, SetSchedule] = useState([]);
    let [movies, SetMovies] = useState([]);
    let [moviess, SetMoviess] = useState([]);
    let [cookie, SetCookie] = useCookies(['date', 'selectedTheater', 'selectedDate']);
    let [theater, setTheater] = useState([]);
    let [noShow, setNoShow] = useState('');

    let arrr = [];
    let arrrr = [];

    useEffect(() => {
        loadSchedule();
        loadMovies();
        loadTheaters();
        msgg();
    }, []);

    let loadSchedule = () => {
        let url = mainUrl + "/movieschedules"
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                let arr = []
                let result = []

                res.map(e => {
                    if (!arr.includes(e.date)) {
                        result.push(e)
                        arr.push(e.date)
                    }
                })
                return result
            })
            .then((res) => {
                SetSchedule(res)
            })
    };
    let loadMovies = () => {
        let url = mainUrl + "/movieschedules"
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetMovies(res)
            })
    };
    let sendDate = (e) => {
        SetCookie('date', e, { path: '/' })
    };
    let loadTheaters = () => {
        let url = mainUrl + "/theaters";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setTheater(res)
            });
    };
    let dateSend = (e) => {
        SetCookie('selectedDate', e, { path: '/' })
    };
    let theaterSend = (e) => {
        SetCookie('selectedTheater', e, { path: '/' });
        SetCookie('selectedDate', ' ', { path: '/' });
    };
    let msgg = () => {
        if (cookie.selectedDate === " ") {
            setNoShow("No movie showing,please select a date")
        }
    };
    console.log(cookie.selectedDate)


    return <>
        <div className="maincen">
            <div className="cen">
                <Nav />
                <div className="cinema-main cen">
                    <h2>what's on</h2>
                    <div className="movie-rightt flex" style={{ marginTop: '25px', justifyContent: 'space-between' }}>
                        <div className="buy-select">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" style={{
                                    width: "15rem", borderRadius: "1px", marginTop: "5px", color: "black", backgroundColor: 'white',
                                    border: '3px solid maroon'
                                }}>
                                    Select  a Cinema
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {theater.map(x => {
                                        return (
                                            <div key={x._id}>
                                                <Dropdown.Item onClick={() => theaterSend(x.name)}>{x.name}</Dropdown.Item>
                                            </div>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="buy-select">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" style={{
                                    width: "15rem", borderRadius: "1px", marginTop: "5px", color: "black", backgroundColor: 'white',
                                    border: '3px solid maroon'
                                }}>
                                    Select  a Date
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {schedule.map(x => {
                                        let properDate = new Date(x.date).toDateString()
                                        if (cookie.selectedTheater === x.theater_id.name)
                                            return (
                                                <div key={x._id}>
                                                    <Dropdown.Item onClick={() => dateSend(x.date)}>{properDate}</Dropdown.Item>
                                                </div>
                                            )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    {noShow}

                    <div style={{ marginTop: '50px', marginBottom: '70px' }}>
                        <h3 style={{ textAlign: 'center', color: 'maroon' }}>Please Choose a Cinema and Date</h3>
                        {movies.map((e) => {
                            let day = new Date(e.date).getDate();
                            let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'long' });
                            let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                            let year = new Date(e.date).getFullYear();
                            let date = day + ', ' + month + ' - ' + year;
                            let arr = []
                            arr.push(e.theater_id.name);
                            console.log(arr)
                            if (cookie.selectedTheater === e.theater_id.name && cookie.selectedDate === e.date) {
                                return (
                                    <MovieShowings
                                        key={e._id}
                                        image={e.movie_id.image}
                                        title={e.movie_id.title}
                                        synopsis={e.movie_id.synopsis}
                                        casts={e.movie_id.casts}
                                        running_time={e.movie_id.running_time}
                                        time={e.time_id}
                                        movie={e.movie_id._id}
                                        date2={dayName}
                                        date={date}
                                        movieID={() => sendDate(e.date)}
                                    />
                                )
                            }
                        })
                        }
                    </div>
                </div>
                <Chat />
                <Footer />
            </div>
        </div>
    </>
}

export default BuyTicket;