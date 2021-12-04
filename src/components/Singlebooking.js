import React, { useContext, useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom";
import { Store } from "../context/store";
import { PaystackButton } from "react-paystack";
import { useCookies } from 'react-cookie';

function Singlemovie(props) {
  let [cookie] = useCookies(['site'])
  let history = useHistory();
  let store = useContext(Store);
  let [close, setClose] = useState('none')
  let [open, setOpen] = useState('view')
  let [name, SetName] = useState('');
  let [email, SetEmail] = useState('');
  let [amount, SetAmount] = useState(null);
  let [seatNo, SetSeat] = useState(null);
  let [title, SetTitle] = useState('');
  let [timer, SetTimer] = useState('');
  let [iD, SetId] = useState('');
  let [mainUrl] = store.hosting;
  let [book, setBook] = store.ShowBook;
  const publicKey = "pk_test_332dac7ec4c199f3168acb3f6cb84050e526aeb9";
  let btnHide_ = useRef();

  useEffect(() => {
    viewBook();
  }, []);

  let viewBook = () => {
    let url = mainUrl + "/userbookeds";
    fetch(url)
      .then(res => res.json())
      .then(result => {
        setBook(result);
      });
  };
  let sett = (a, b, c, d, e, f, g, h) => {
    SetName(a);
    SetEmail(b);
    SetAmount(c)
    SetSeat(d)
    SetTitle(e)
    setClose('view', g)
    setOpen('none')
    SetId(f)
    SetTimer(g);

    // let payButton = document.querySelectorAll("#btnPay");
    // payButton.forEach((e, i) => {
    //   alert(e, i)
    //   // setClose('view')
    // })
  };

  let end = () => {
    setClose('none')
    setOpen('view')
  };

  let updateUerBooked = (id) => {
    id = iD
    let url = mainUrl + "/userbooked/" + iD;

    fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: "PUT"
    })
      .then((res) => res.json())
      .then((result) => {
        viewBook()
      });
  };

  let deleteUerBooked = (id) => {
    id = iD
    let url = mainUrl + "/userbooked/" + iD;

    fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((result) => {
        viewBook()
      });
  };

  const componentProps = {
    email,
    amount: (amount * 100),
    metadata: {
      name,
      seatNo,
      title
    },
    publicKey,
    text: "Pay Now",
    onClick: () => console.log('hi'),
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onSuccess: () => history.push(`/${cookie.site}/home`),
    onSuccess: () => updateUerBooked(),
    onClose: () => alert("Wait! Don't leave :("),
    onClose: () => end()
  };

  return <>

    <div className="BKSec">
      <div className="BKfavorite">
        <h4>You are one step from viewing your favorite movie/s</h4>
      </div>
      <hr />
      <div className="BKHolder">
        <div className="bookCon">
          {
            book?.map((e, i) => {
              if (cookie.site === e.company.toLowerCase() && e.paidseat === false)
                return (
                  <div className="books" key={e._id} >
                    <div className="BKimg">
                      <img src={mainUrl + e.movie_id.image} />
                    </div>

                    <div className="booksContent">
                      <p>Theater : {e.theater_id.name}</p>
                      <p>Screen : {e.screen_id.screen}</p>
                      <p>Time : {e.time_id.time}</p>
                      <p>Price : {e.prices}</p>
                      <p>SeatNo : {e.seatNo}</p>
                      <div className="">
                        <label>Confirm Booking</label>
                        <input type="checkbox" onChange={(i) => sett(e.name, e.email, e.prices,
                          e.seatNo, e.movie_id.title, e._id, i.target.style)} />
                      </div>
                      {/* <button className={open} onClick={() => sett(e.name, e.email, e.prices, e.seatNo, e.movie_id.title, e._id, e.createdAt)}>Click to Confirm Booking</button> */}
                      <PaystackButton
                        ref={btnHide_} className={close} id='btnPay'
                        {...componentProps}
                      />
                    </div>
                  </div>
                )
            })
          }
        </div>
        <br /> <br /> <br />
      </div>
    </div>
  </>
}


export default Singlemovie;