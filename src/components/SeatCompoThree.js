import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PaystackButton } from "react-paystack"
import { Store } from "../context/store";
import Address from "../Assets/address.png";
let SeatCompoThree = () => {
    let store = useContext(Store);
    let [title, setTitle] = store.title;
    let [image, setImage] = store.image;
    let [movieSchedules, setMovieSchedules] = store.movieScheduleArr;
    let [date, setDate] = store.date;
    let [time, setTime] = store.time;
    let [name, setName] = store.name;
    let [email, setEmail] = store.email;
    let [price,] = store.price;
    let [msg, setMsg] = store.msg
    let history = useHistory();



    let [amount, setAmount] = useState(null);
    let [seatNo, SetSeat] = useState(null);
    let btnInfo = useRef();
    let btnHide_ = useRef();
    let payDiv = useRef();
    let payInput = useRef();



    const publicKey = "pk_test_332dac7ec4c199f3168acb3f6cb84050e526aeb9"

    // let fetchSchedule = () => {
    //     let url = "http://localhost:5100/movieschedule/"+ id
    // }    
    let sendInfo = () => {
        setEmail(email);
        setName(name);
        console.log(price)
        setAmount(price * 100);
        console.log(amount);
        if (email && name) {
            btnInfo.current.style.display = "none"
            btnHide_.current.style.display = "block"
            payInput.current.style.display = "none"
            payDiv.current.style.display = "block"
        } else {
            setMsg("Please Input Your Details")
        }


    }
    const componentProps = {
        email,
        amount,
        name,
        metadata: {
            name
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>{
            alert("Thanks for doing business with us! Come back soon!!")
            history.push("/")

        },
        // onSuccess: () => pay(),
        onClose: () => alert("Wait! Don't leave :("),
    };

    return <>
        <section className="seatPageOne" style={{ marginTop: '70px' }}>
            <div ref={payDiv} style={{ display: "none" }}>

                <div className="seatTxt">
                    <h1>PAY NOW</h1>
                </div>
                <div className="seatBoldSm">
                    <p>
                        Click to pay now
                    </p>
                </div>
            </div>
            <div ref={payInput} style={{ display: "" }}>
                <div className="seatTxt" >
                    <h1>START CHECKOUT</h1>
                </div>
                <div className="seatBoldSm">
                    <p style={{ color: "red", fontSize: "20px" }}>{msg}</p>
                    <p>
                        Start your checkout by entering your email address below<br />
                        Username (required)
                    </p>
                    <br />
                    <input type="name" id="payEmail" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />
                    <p> Email (required)</p>
                    <br />
                    <input type="email" id="payEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
            </div>

            <br /><br />
            <button id="contBtn" ref={btnInfo} style={{ display: "" }} onClick={() => sendInfo()}>Continue</button>
            <button ref={btnHide_} style={{ display: "none" }} id="payBtn">
                <PaystackButton

                    {...componentProps} />
            </button>

        </section>

    </>
}
export default SeatCompoThree;