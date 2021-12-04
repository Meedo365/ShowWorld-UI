import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Store } from "../context/store";

function MovieShowings(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let route = '/movie-showing/' + props.movie;
    let [movies, SetMovies] = useState([]);
    useEffect(() => {
        loadMovies();
    }, []);
    let loadMovies = () => {
        let url = mainUrl + "/movieschedules"
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetMovies(res)
            })
    };
    return <>
        <div className="movie_row flex">
            <Link to={route}>
                <img src={mainUrl + props.image} alt="" onClick={props.movieID} />
            </Link>
            <div>
                <h5>{props.title}</h5>

                <p style={{ color: 'maroon' }}>{props.synopsis}</p>
                {/* <Link to={route}>
                    <p style={{ fontSize: '0.85rem' }} onClick={props.movieID}>full synopsis</p>
                </Link> */}
                <p>casts: {props.casts}</p>
                <p className="running flex">
                    running time: {props.running_time} mins
                </p>
                <div className="movie_time" >
                    <Link to={route} >
                        {props.date2} {props.date}
                        <div className="flex">
                            {props.time.map((e) => {
                                return (
                                    < p style={{ width: 'min-content' }} onClick={props.movieID} > {e.time}</p>
                                )
                            })}
                        </div>

                    </Link>
                </div>
                <div className="movie_time flex">
                    <Link to={route}>
                        <p onClick={props.movieID}>more showtimes</p>
                    </Link>
                </div>
            </div>
        </div >

    </>
}

export default MovieShowings;