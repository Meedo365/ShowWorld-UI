import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Store } from "../context/store";
import ReactPlayer from "react-player";
import ThisMovieTime from './timing';
import { useParams } from 'react-router-dom';
import TheTheater from './theaterShowing';

function ThisMovie(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let route = '/seats/' + props.id;
    let [schedule, SetSchedule] = useState([]);
    let [theater, SetTheater] = useState([]);
    let id = useParams();
    let loadSchedule = () => {
        let url = mainUrl + "/movieschedule/" + id.id;
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetSchedule(res)
            })
    };

    let loadTheater = () => {
        let url = mainUrl + "/movieschedules";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetTheater(res)
            })
    };

    useEffect(() => {
        loadSchedule();
        loadTheater();
    }, []);

    return <>
        <div className="cen">
            <div className="player">
                <ReactPlayer
                    width="100%"
                    height="22rem"
                    url={`${props.trailer}`}
                />
            </div>
            <div className='flex' style={{ marginTop: '50px', marginBottom: '50px', gap: '2%' }}>
                <div className='movie-leftt'>
                    <h4 id="theater">{props.theater}</h4>
                    <div className='movieHead'>
                        <h4>{props.title}</h4>
                    </div>

                    <div className='movie-left flex'>
                        <img src={mainUrl + props.image} alt="" />
                        <div>
                            <h6>{props.synopsis}</h6>
                            <div className="flex" style={{ marginTop: '35px' }}>
                                <div className="movie-details">
                                    <p>rating:</p>
                                    <p>running time:</p>
                                    <p>cast:</p>
                                    <p>release date:</p>
                                </div>
                                <div>

                                    <p>{props.rating}</p>
                                    <p>{props.running_time} MINS</p>
                                    <p>{props.casts}</p>
                                    <p>{props.release}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='movie-right'>
                    {/* <div>
                        <label style={{ color: 'white', fontWeight: '600', fontSize: '1.2rem' }}>
                            Select a Cinema
                        </label> <br />
                        {theater.map((e) => {
                            if (e.movie_id._id === id.id)
                                return (
                                    <TheTheater
                                        theater={e.theater_id.name}
                                    />)
                        })}
                    </div> */}

                    {schedule.map((e) => {
                        let day = new Date(e.date).getDate();
                        let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'long' });
                        let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                        let year = new Date(e.date).getFullYear();
                        let date = day + ', ' + month + ' - ' + year;
                        return (
                            <ThisMovieTime
                                key={e._id}
                                date2={dayName}
                                date={date}
                                time={e.time_id}
                                id={e._id}
                                // chooseTime={(a) => alert(a)}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    </>
}

export default ThisMovie;