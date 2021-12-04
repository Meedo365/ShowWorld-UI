import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Store } from "../context/store";
import Address from "../Assets/address.png";
let SeatCompoTwo = (props) => {
    let store = useContext(Store);
    let [title, setTitle] = store.title;
    let [image, setImage] = store.image;
    let [prices, setPrices] = useState([]);
    let [date, setDate] = store.date;
    let [time, setTime] = store.time;
    let [price, setPrice] = store.price;
    let [seatNo, SetSeat] = useState(null);
    let [seatNu,] = store.seatNumber;
    let opt = useRef();

    return <>
        <section className="seatPageOne">
            <div className="seatTxt">
                <h1>{props.movieName}</h1>
            </div>
            <div className="seatBoldSm">
                <h1>
                    {new Date(props.timeDate).toDateString()}, {props.timeTime}
                </h1>
            </div>
            <div className="seatLightText">
                <p>
                    Please select the type of tickets you would like.
                </p>
            </div>
            <br />
            <div className="seatTxt">
                <h1>SELECT YOUR SEATS</h1>
                <p id="textSeat">
                    If you hold a {props.theaterName} Cinema Membership, select the
                    Full Price ticket type and the discount will appear in your basket.
                    Please enter the number of tickets you would like to book.
                    You will be automatically allocated seats based on our social distancing policy.
                </p>
                <br />
            </div>
            <br /><br />

            <hr />
            <section className="priceSection">
                <ul>
                    <h1>Theater</h1>
                    <h1>Seat</h1>
                    <h1>Price</h1>
                </ul>
                <ul>
                    <h1>Screen</h1>
                </ul>
            </section>
            <section className="priceSection">
                <ul>
                    <p>{props.theaterName}</p>
                    <p>{seatNu}</p>
                    {/* <select> */}
                    {/* {prices.map(e => {
                            return ( 
                                <option key={e._id} ref={opt}  value={price} onChange={(e)=>setPrice(e.target.value)}>${e.price}</option>
                            )
                        })} */}
                    <p>${price}</p>
                    {/* </select> */}
                </ul>
                <ul><p>{props.screenName}</p></ul>
            </section>
            <br />  <br />
        </section>

    </>
}
export default SeatCompoTwo;