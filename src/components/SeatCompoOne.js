import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Store } from "../context/store";
import Address from "../Assets/address.png";
let SeatCompoOne = (props) => {
    let store = useContext(Store);
    let [title, setTitle] = store.title;
    let [image, setImage] = store.image;
    let [movieSchedules, setMovieSchedules] = store.movieScheduleArr;
    let [date, setDate] = store.date;
    let [screenId, setScreenId] = store.screen_id;
    let [theaterId, setTheaterId] = store.theater_id;

    let [time, setTime] = store.time;
    let [price, setPrice] = store.price;
    let [vvip, setVvip] = useState(parseInt(props.timePrice) + 1000);
    let [vip, setVip] = useState(parseInt(props.timePrice) + 500);
    let [regular, setRegular] = useState(props.timePrice);
    let [seatNo, SetSeat] = useState(null);
    let [subRegular, setSubRegular] = useState(0);
    let [subVip, setSubVip] = useState(0);
    let [subVvip, setSubVvip] = useState(0);

    let [one, setOne] = useState(0);
    let [two, setTwo] = useState(0);
    let [three, setThree] = useState(0);



    let [seatNu, setSeatNu] = store.seatNumber
    let [msg, setMsg] = store.msg

    let x;
    let [count, setCount] = useState(0)
    // let seat_vvip = [...Array(props.screenVvip)]
    // let seat_vip = [...Array(props.screenVip)]
    // let seat_regular = [...Array(props.screenRegular)]

    // function vvipFunc(e) {

    //     let vvip_images = document.querySelectorAll('.vvip');
    //     vvip_images.forEach((e, i) => {
    //         e.onclick = () => {
    //             e.style.border = "1px solid red";
    //             e.disabled = "true";
    //             e.style.fill = "red";
    //             x = e.getAttribute('value');
    //             setPrice(parseInt(props.timePrice) + parseInt(x));
    //             SetSeat(i)
    //             setSeatNu("A" + i);
    //             console.log(i, price)
    //         }
    //     })

    // };

    // function vipFunc(e) {
    //     let vip_images = document.querySelectorAll('.vip');
    //     vip_images.forEach((e, i) => {
    //         e.onclick = () => {
    //             e.style.border = "1px solid green";
    //             e.style.fill = "red";
    //             e.style.disabled = "true";
    //             x = e.getAttribute('value');
    //             setPrice(parseInt(props.timePrice) + parseInt(x));
    //             SetSeat(i)
    //             setSeatNu("B" + i);
    //             console.log(i, price)

    //         }
    //     })
    // };
    // function regularFunc(e) {
    //     let regular_images = document.querySelectorAll('.regular');
    //     regular_images.forEach((e, i) => {
    //         e.onclick = () => {
    //             if (count !== 10) {
    //                 x = e.getAttribute('value');
    //                 setPrice(parseInt(props.timePrice) + parseInt(x));
    //                 e.style.border = "1px solid blue";
    //                 e.style.color = "red";
    //                 e.style.disabled = "true";
    //                 SetSeat("A" + i)
    //                 setSeatNu("C" + i);
    //                 count.push(i);
    //                 // count+=1
    //                 console.log(i, count, price)

    //             } else {
    //                 setMsg("cant select more than ten seat");
    //             }
    //         }
    //     })
    // };

    let selectRegularValue = () => {
        let regularSelect = document.getElementById("regularSelect").value;
        setSubRegular(regular * regularSelect);
        // console.log(subRegular);

        if (regularSelect > 0) {
            setOne(regularSelect);
            console.log(regularSelect, count);

        } else {
            setOne(0);
        }
        // console.log(regularSelect,count);
    }
    let selectVipValue = () => {
        let vipSelect = document.getElementById("vipSelect").value;
        setSubVip(vip * vipSelect);
        if (vipSelect > 0) {
            setTwo(vipSelect);
        } else {
            setTwo(0);
        }
        console.log(vipSelect);
    }
    let selectVvipValue = () => {
        let vvipSelect = document.getElementById("vvipSelect").value;
        setSubVvip(vvip * vvipSelect);
        if (vvipSelect > 0) {
            setThree(vvipSelect);
        } else {
            setThree(0);

        }
        console.log(vvipSelect);
    }
    setPrice(subRegular + subVip + subVvip);
    let z = (parseInt(one) + parseInt(two) + parseInt(three));

    console.log(z)
    setScreenId(z);
    return <>
        <section className="seatPageOne">
            <div className="seatTxt">
                <h1>SELECT YOUR SEATS</h1>
            </div>
            <div className="seatBoldText">
                <p>
                    If you hold a {props.theaterName} Cinema Membership, select the Full Price ticket type and the discount will
                    appear in your basket.
                    If you would like to redeem your Membership Free Tickets on a booking enter FRIENDSFREE
                    if you have a Single Membership, or JOINTFREE
                    if you have a Joint Membership into the "Promo Code" box after adding tickets into your Basket.
                </p>
            </div>
            <div className="seatLightText">
                <h2>For Films screening before  {new Date(props.timeDate).toDateString()}</h2>
                <p>
                    Please enter the number of tickets you would like to book.
                    You will be automatically allocated seats based on our social distancing policy.
                </p>
            </div>
            <br />
            <div className="seatBoldSm">
                <h1>{props.movieTitle}</h1>
                <p>{props.movieSynosis}<br />
                    {new Date(props.timeDate).toDateString()}
                    , {props.timeTime}<br />
                    {props.screenName},  {props.theaterName} Cinema
                </p>
                <br />

                <p>
                    Please select your seats (maximum 10 for this event per order)
                </p>
                <p style={{ color: "red", fontSize: "20px" }}>{msg}</p>

            </div>
        </section>

        <section>
            <div className="selectPrice">
                <div style={{ width: '50%' }}>
                    <p>Selection</p>
                </div>
                <div className="selectQty" style={{ width: '50%' }}>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Subtotal</p>
                </div>
            </div>

            <div className="selectPrice">
                <div style={{ width: '50%' }}>
                    <p>MOVIE TICKET + REGULAR CLASS</p>
                    <p>MOVIE TICKET + VIP CLASS</p>
                    <p>MOVIE TICKET + VVIP CLASS</p>
                    <div className='flex' style={{ justifyContent: "space-between" }}>
                        <p>{z} ticket(s) selected at a total cost of:</p>
                        <p><b>${price}</b></p>
                    </div>

                </div>
                <div style={{ width: '50%' }}>
                    <div className="selectQtyTwo" >
                        <p>${props.timePrice}</p>
                        <select id="regularSelect" onChange={() => selectRegularValue()}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <p><b>${subRegular}</b></p>
                    </div>
                    <div className="selectQtyTwo">
                        <p>${vip}</p>
                        <select id="vipSelect" onChange={() => selectVipValue()}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <p><b>${subVip}</b></p>
                    </div>
                    <div className="selectQtyTwo">
                        <p>${vvip}</p>
                        <select id="vvipSelect" onChange={() => selectVvipValue()}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <p><b>${subVvip}</b></p>
                    </div>

                </div>

            </div>

        </section>



        {/* <section className="seatImg">
                        
            <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>REGULAR SECTION</h1>
                        <section className="seat_div">

                            {seat_regular.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <img value={200} id="seat" className="regular" onClick={() => regularFunc(e)} style={{ color: "#fff" }}
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyvFpWaYEkS_ddADtCvv6vJerNIkjSgHF1_SEFZ0eSC5oDTFY_LQ6gA3roP7wWkyTTHREEk&usqp=CAU" />
                                    </div>
                                )
                            })}
                        </section>
                        <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>VIP SECTION</h1>
                        <section className="seat_div">

                            {seat_vip.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <img value={700} id="seat" className="vip" onClick={() => vipFunc(e)} style={{ color: "#fff" }}
                                            src="https://www.svgrepo.com/show/204084/chair-seat.svg" />

                                    </div>
                                )
                            })}
                        </section>

                        <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}> VVIP SECTION</h1>
                        <section className="seat_div">
                            {seat_vvip.map((e, i) => {
                                return (
                                    <div key={i} style={{padding:"0px",margin:"0px"}} >
                                        < img id="seat" value={1000} className="vvip" onClick={() => vvipFunc(e)} style={{ display: "inlineFlex" }}
                                            src="https://icon-library.com/images/seat-icon/seat-icon-13.jpg" />

                                    </div>
                                )
                            })}
            </section>
            <p id="screenName">SCREEN</p>

                    </section> */}
    </>
}
export default SeatCompoOne;