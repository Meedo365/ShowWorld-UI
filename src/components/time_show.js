import React, { useContext} from 'react';
import { Link } from "react-router-dom";
import film from "../Assets/film.png"
import { Store } from "../context/store";


function TimeShow(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let route = '/movie-showing/' + props.movie;
    
    return <>
        <div className="movie_row flex">

            <div className="movie_time" >
                <Link to={route}>
                    <p style={{ width: 'min-content' }} onClick={props.movieIDs}>{props.times}</p>
                </Link>
            </div>

        </div >

    </>
}

export default TimeShow;