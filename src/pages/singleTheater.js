import React, { useEffect, useState, useContext, useRef } from 'react';
import DateShowings from '../components/dateShowing';
import MovieShowings from '../components/movies_showing';
import { Store } from "../context/store";
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function SingleTheater() {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [schedule, SetSchedule] = useState([]);
    let [movies, SetMovies] = useState([]);
    let [timeeId, SetTime] = useState('');
    let [movieId, SetMovieId] = store.moviess;
    let id = useParams();
    let theater = id.id;
    let [_date, SetDate] = useState(new Date());
    let btnShow = useRef();
    let [cookie, SetCookie] = useCookies([]);

    useEffect(() => {
        loadSchedule();
        loadMovies();
    }, []);



    let loadSchedule = () => {
        let url = mainUrl + "/movieschedules"
        
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                let arr = []
                let result = []
                
                res.map(e => {
                    if(!arr.includes(e.date)){
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
        let url = mainUrl + "/movieschedules";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetMovies(res)
            })
    };
    let reload = (e) => {
        if (e < _date) {

        } else {
            SetTime(e)
            btnShow.current.style.display = 'none'
        }
    };
    let showNoMovie = () => {
        SetTime('');
        btnShow.current.style.display = 'block';
    };
    let sendDate = (e) => {
        SetCookie('date', e, { path: '/' })
    };


    return <>
        <div className="maincen">
            <div className="cinema-main cen">
                <Nav />
                <h2>what's on</h2>
                <h4>now playing</h4>
                <div className="dates_showing flex" style={{ marginTop: '50px' }}>
                    <div className="dates_showing">
                        <p onClick={() => showNoMovie()}>{_date.toDateString()}</p>
                    </div>
                    {schedule.map((e, i) => {
                        let day = new Date(e.date).getDate();
                        let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'long' });
                        let month = new Date(e.date).toLocaleDateString('en-us', { month: 'short' });
                        let year = new Date(e.date).getFullYear();
                        let dates = day + '-' + month + '-' + year;
                        if (theater === e.theater_id._id) {

                            return (
                                <DateShowings
                                    key={e._id}
                                    date={dates}
                                    date2={dayName}
                                    date_select={() => reload(e.date)}
                                />
                            )
                        }
                    })}
                </div>
                <div className="movie_row" ref={btnShow}>
                    <h5>NO MOVIE SHOWING</h5>
                </div>
                <div>
                    {movies?.map((e) => {
                        let day = new Date(e.date).getDate();
                        let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'long' });
                        let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                        let year = new Date(e.date).getFullYear();
                        let date = day + ', ' + month + ' - ' + year;
                        if (theater === e.theater_id._id && timeeId == e.date) {
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
                <Chat />
                <Footer
                    reload={() => showNoMovie()}
                />

            </div>
        </div>
    </>
}

export default SingleTheater;