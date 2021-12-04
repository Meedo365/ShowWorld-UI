import React, { useState, useEffect, useContext } from "react";
import Nav from "../components/Nav";
import SignUp from "../components/SignUp";
import Carousel from 'react-bootstrap/Carousel';
import ComingSoon from "../components/ComingSoon";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
import { Store } from '../context/store';


function Home() {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [open, setOpen] = useState(false);
    let [More, setMore] = useState();
    let [banner, SetBanner] = useState([]);
    let [upcom, SetUpcom] = useState([]);




    useEffect(() => {
        loadBanner();
        loadUpcoming();
    }, []);

    let loadBanner = () => {
        let url = mainUrl + '/banner';
        console.log(url)
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetBanner(res);
                console.log(res)
            })
        // .catch((res) => { console.log(res) })
    };
    let loadUpcoming = () => {
        let url = mainUrl + "/upcomings";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                SetUpcom(res);
            });
    };
    // let handleMore = (id, a) => {
    //     let url = "http://localhost:5100/upcoming/" + id;
    //     fetch(url)
    //         .then((e) => e.json())
    //         .then((res) => {
    //             setMore(res.synopsis);
    //             alert(res.synopsis);
    //             setOpen(true);
    //         });
    // };
    return <>
        <div className="maincen">
            <div className="cen">
                <section className="banner">
                    <Nav />
                    <br /><br />

                    < Carousel className="Slider" controls={false}>
                        {banner.map((e, i) => {
                            return (
                                <Carousel.Item >
                                    <img
                                        className="d-block w-80"
                                        src={mainUrl + e.url}
                                        alt={'banner ' + i}
                                    />
                                    <Carousel.Caption>
                                        <h3>{e.title}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                        }
                    </Carousel>

                    <br /> <br /> <br />
                    <div className="NewsHead"><h3>Coming Soon...</h3></div>
                    <br />
                    <hr className="Nline" />
                    <br />
                    <div className="NewsCon">

                        <div className="NewsSec">
                            {
                                upcom?.map((e, i) => {
                                    if (i >= 2) {
                                        return (
                                            <ComingSoon
                                                key={e._id}
                                                id={e._id}
                                                image={e.logo}
                                                name={e.title}
                                            // click={() => handleMore(e._id)}
                                            // synopsis={More}
                                            />
                                        )
                                    }
                                }
                                )}
                        </div>
                        <div className="NewsSec">
                            {
                                upcom?.map((e, i) => {
                                    if (i === 0) {
                                        return (
                                            <ComingSoon

                                                key={e._id}
                                                id={e._id}
                                                image={e.logo}
                                                name={e.title}
                                            // click={() => handleMore(e._id)}
                                            // synopsis={More}
                                            />
                                        )
                                    }
                                }
                                )}
                        </div>
                        <div className="NewsSec">
                            {
                                upcom?.map((e, i) => {
                                    if (i <= 1) {
                                        return (
                                            <ComingSoon
                                                key={e._id}
                                                id={e._id}
                                                image={e.logo}
                                                name={e.title}
                                            // click={() => handleMore(e._id, e.title)}
                                            // synopsis={More}
                                            />
                                        )
                                    }
                                }
                                )
                            }
                        </div>
                    </div>
                    <Partners />
                    <Chat />

                </section>
                <Footer />
            </div>
        </div>
    </>
}


export default Home;