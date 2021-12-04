import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import film from "../Assets/film.png"
import { Store } from "../context/store";
import TimeShow from './time_show';

function NoMovieShowing(props) {
    return <>
        <div className="movie_row flex">
            <h5>No Movies Showing</h5>
        </div >

    </>
}

export default NoMovieShowing;