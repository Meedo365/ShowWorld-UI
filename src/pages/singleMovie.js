import React, { useEffect, useState, useContext } from 'react';
import ThisMovie from '../components/mainMovie';
import { Store } from "../context/store";
import { useParams } from 'react-router-dom';
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useCookies } from 'react-cookie';
import ThisMovieTime from '../components/timing';
import TheTheater from '../components/theaterShowing';




function SingleMovie() {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [movieId, SetMovieId] = store.moviess;
    let [seatPay, SetSeatPay] = store.seatings;
    let [schedule, SetSchedule] = useState([]);
    let [cookie, SetCookie] = useCookies([]);
    let id = useParams();

    let loadSchedule = () => {
        let url = mainUrl + "/movieschedule/" + id.id;
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetSchedule(res)
            })
    };

    useEffect(() => {
        loadSchedule();
    }, []);

    return <>
        <div className="maincen">
            <div className="cen">
                <Nav />
                {schedule.map((e) => {
                    let day = new Date(e.date).getDate();
                    let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'long' });
                    let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                    let year = new Date(e.date).getFullYear();
                    let date = day + ', ' + month + ' - ' + year;
                    if (cookie.date === e.date) {
                        return (
                            <ThisMovie
                                key={e._id}
                                trailer={e.movie_id.trailer_link}
                                title={e.movie_id.title}
                                image={e.movie_id.image}
                                synopsis={e.movie_id.synopsis}
                                rating={e.movie_id.rating}
                                running_time={e.movie_id.running_time}
                                casts={e.movie_id.casts}
                                release={e.movie_id.release_date}
                                theater={e.theater_id.name}
                                id={e._id}
                            />
                        )
                    }
                })
                }
                <Chat />
                <Footer />
            </div>
        </div>
    </>
}

export default SingleMovie;