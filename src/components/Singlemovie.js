import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Store } from "../context/store";
import ReactPlayer from "react-player";
import ScheduleCard from "./scheduleCard";
import { useCookies } from 'react-cookie';
import { Modal } from "react-bootstrap";
import Footer from "../components/Footer";



function Singlemovie(props) {
  let store = useContext(Store);
  let [mainUrl] = store.hosting;
  let history = useHistory();
  let [book, setBook] = store.ShowBook;


  let [, setSlocation] = useState()
  let [, setSClass] = useState()
  let [, setSPrice] = useState()
  let [, setSscreen] = useState();
  let [aboutUs, SetAbout] = useState([]);

  let [schedule, SetSchedule] = useState([]);

  const [lgShow, setLgShow] = useState(false);
  let [vvip, setVvip] = useState(null);
  let [vip, setVip] = useState(null);
  let [regular, setRegular] = useState(null);
  let [price, setPrice] = useState(null);

  let [, setScId] = useState(null);
  let [prices, SetPrices] = useState(null);
  let [pp, setPp] = useState(0);
  let [p, setP] = useState(0);

  let [ppp, setPpp] = useState(0);
  let [name, setName] = store.name;
  let [email, setEmail] = store.email;
  let [seatNo, SetSeat] = store.seatingArr;
  let [amount, setAmount] = store.amounts;
  let [title, setTitle] = store.title;

  let [cookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
    'theater', 'dev', 'counter', 'site']);

  let date = new Date(props.release_date);
  let dateS = date.getYear() + '-' + date.getMonth() + '-' + date.getDay()

  let time = date.getHours() - 2 + ':' + date.getMinutes();
  console.log(time)

  let time2 = date.getHours() + ':' + date.getMinutes();
  console.log(time2)

  let time3 = date.getHours() + 6 + ':' + date.getMinutes();
  console.log(time3)



  useEffect(() => {
    loadLocations();
    loadClasses();
    loadSchedule();
    loadAbout();
  }, []);

  let loadLocations = () => {
    let url = mainUrl + "/locations";
    fetch(url)
      .then((e) => e.json())
      .then((res) => {
        setSlocation(res)
        setSscreen(res)
      });

  };
  let loadClasses = () => {
    let url = "http://localhost:5100/classes";
    fetch(url)
      .then((e) => e.json())
      .then((res) => {
        setSClass(res)
        setSPrice(res)
      });

  };
  let id = props.id
  let loadSchedule = () => {
    let url = mainUrl + "/movieschedule/" + id;
    fetch(url)
      .then((e) => e.json())
      .then((res) => {
        SetSchedule(res)
      })
  };
  let loadAbout = () => {
    let url = mainUrl + "/abouts";
    fetch(url)
      .then((e) => e.json())
      .then((res) => {
        SetAbout(res);
      })
  };

  // screen
  function scrId(id, vvip, vip, regular, timePrice) {
    setScId(id);
    setVvip(vvip);
    setVip(vip);
    setRegular(regular);
    setPrice(timePrice);
    console.log(id, vvip, vip, regular, "screen");
    setLgShow(true);
  };
  let seat_vvip = [...Array(vvip)]
  let seat_vip = [...Array(vip)]
  let seat_regular = [...Array(regular)]

  function vvipFunc(e) {

    let vvip_images = document.querySelectorAll('.vvip'); //vvip
    // vvip section
    vvip_images.forEach((e, i) => {
      setP(e.getAttribute('value'));
      e.onclick = () => {
        e.style.border = "1px solid red";
        e.disabled = "true";
        e.style.fill = "red";
        e.style.background = 'black'
        SetSeat(i + 1);
      }
    })
    SetPrices(parseInt(p) + parseInt(price));
    setEmail(cookie.email);
    setName(cookie.name);
  };

  function vipFunc(e) {
    let vip_images = document.querySelectorAll('.vip'); //vip
    //vip section
    vip_images.forEach((e, i) => {
      setPp(e.getAttribute('value'));
      e.onclick = () => {
        e.style.border = "1px solid green";
        e.style.fill = "red";
        e.style.disabled = "true";
        SetSeat(i + 1)
      }
    })
    SetPrices(parseInt(pp) + parseInt(price));
    setEmail(cookie.email);
    setName(cookie.name);
  };
  function regularFunc(e) {
    let regular_images = document.querySelectorAll('.regular'); //regular
    //regular section
    regular_images.forEach((e, i) => {
      setPpp(e.getAttribute('value'));
      e.onclick = () => {
        e.style.border = "1px solid blue";
        e.style.color = "red";
        e.style.disabled = "true";
        SetSeat(i + 1);
      }
    })
    SetPrices(parseInt(ppp) + parseInt(price));
    setEmail(cookie.email);
    setName(cookie.name);
  };

  let booking = (id, movieId, timeId, screenId, theaterId, timeprice, title) => {
    let item = {
      company: cookie.site,
      movies_schedule_id: id, time_id: timeId, movie_id: movieId,
      screen_id: screenId, theater_id: theaterId, user_id: cookie.id, prices,
      seatNo, title: title, email, name
    };
    let url = mainUrl + "/userbooked";
    fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(item)

    })
      .then((res) => res.json())
      .then((result) => {
        history.push('/' + cookie.site + "/booking")
      });
  };
  let x = parseInt(p) + parseInt(price);
  let y = parseInt(pp) + parseInt(price);
  let z = parseInt(ppp) + parseInt(price);

  return <>

    <div className="SMov">
      <div className="SMimg">
        <ReactPlayer
          width="100%"
          height="350px"
          url={`${props.trailer}`}
        />
      </div>
      <p style={{ marginTop: '50px' }}>{props.title}</p>
    </div>

    <div className="SMSec">

      <div className="flex SM1">
        <div className="SMSecImg" >
          <img style={{ width: '20rem', height: '15rem' }} src={mainUrl + props.image} alt="" />
        </div>
        <div className="SMSsec">
          <div className="SMSecSynop" style={{ textTransform: 'uppercase' }}>
            <h4>synopsis</h4>
            <p>{props.synopsis}</p>
          </div>
        </div>
      </div>

      <div className="SM2">
        <form action={mainUrl + "/locations"} method="POST">
          <div className="SMschedule">
            <h4>MOVIE SCHEDULE</h4>
            <br /><br />

          </div>
          <div className="cardS">
            {
              schedule.map((e, i) => {
                let day = new Date(e.time_id.date).getDate();
                let month = new Date(e.time_id.date).getMonth() + 1;
                let year = new Date(e.time_id.date).getFullYear();
                let date = day + '-' + month + '-' + year;
                console.log(e);
                return (
                  < ScheduleCard
                    key={e._id}
                    id={e._id}
                    title={e.movie_id.title}
                    image={e.movie_id.image}
                    date={date}
                    time={e.time_id.time}
                    screen={e.screen_id.screen}
                    theater={e.theater_id.name}
                    price={prices}
                    booking={() => booking(e._id, e.movie_id._id,
                      e.time_id._id, e.screen_id._id, e.theater_id._id, e.time_id.price, e.movie_id.title)}
                    seating={() => scrId(e.screen_id._id, e.screen_id.vvip,
                      e.screen_id.vip, e.screen_id.regular, e.time_id.price)}
                  />
                )
              })
            }

            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Seats Arrangement by Class
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}> VVIP SECTION <br />Select seat to update price: ${x}</h1>
                <section className="seat_div">
                  {seat_vvip.map((e, i) => {
                    return (
                      <div key={i} >
                        < img id="seat" value={1000} className="vvip" onClick={() => vvipFunc(e)} style={{ display: "inlineFlex" }}
                          src="https://icon-library.com/images/seat-icon/seat-icon-13.jpg" />

                      </div>
                    )
                  })}
                </section>
                <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>VIP SECTION <br />Select seat to update price: ${y}</h1>
                <section className="seat_div">

                  {seat_vip.map((e, i) => {
                    return (
                      <div key={i} className="seat_div">
                        <img value={700} id="seat" className="vip" onClick={() => vipFunc(e)}
                          src="https://www.svgrepo.com/show/204084/chair-seat.svg" />

                      </div>
                    )
                  })}
                </section>

                <h1 style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>REGULAR SECTION <br />Select seat to update price: ${z}</h1>
                <section className="seat_div">

                  {seat_regular.map((e, i) => {
                    return (
                      <div key={i} className="seat_div">
                        <img value={200} id="seat" className="regular" onClick={() => regularFunc(e)} style={{ color: "#fff" }}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyvFpWaYEkS_ddADtCvv6vJerNIkjSgHF1_SEFZ0eSC5oDTFY_LQ6gA3roP7wWkyTI3k&usqp=CAU" />
                      </div>
                    )
                  })}
                </section>

              </Modal.Body>
            </Modal>
          </div>
        </form>
      </div>
    </div>

    <div>
      {aboutUs.map((e) => {
        if (cookie.site === e.company.toLowerCase()) {
          return (
            <Footer
              foot={e.description}
              name={e.name}
            />)
        }
      })}
    </div>


  </>
}


export default Singlemovie;