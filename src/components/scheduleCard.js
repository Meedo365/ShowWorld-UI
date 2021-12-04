import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Store } from "../context/store";



function ScheduleCard(props) {
    let store = useContext(Store);
    let [book, setBook] = store.ShowBook;

    let handleBook = (_id, image, title, date, time, screen, theater) => {

        let item = book.find((x) => x._id === _id);
        if (!item) {
            let data = { _id, image, title, date, time, screen, theater };
            let bookItems = [...book];
            bookItems.push(data);
            setBook(bookItems);
        };
    };

    return <>
        {/* <Link to="/booking" style={{ color: 'white' }}> */}
        {/* <div id="schedule" onClick={() => handleBook(props.id, props.image, props.state, props.BtnName)}> */}
        <div id="schedule"  >
            <p>Theater: {props.theater}</p>
            <p>Screen: {props.screen}</p>
            <p>Date: {props.date}</p>
            <p>Time: {props.time}</p>
            <h6 id="seat-select" onClick={props.seating}>Click here to Select Seat</h6>
            <h6 id="seat-select" onClick={props.booking}>Book</h6>
        </div>
        {/* </Link> */}
    </>
}
export default ScheduleCard;