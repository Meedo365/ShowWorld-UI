import React, { useEffect, useState, useContext } from "react";
// import Footimg1 from "../Assets/facebookIMG.png";
// import Footimg2 from "../Assets/twitterIMG.png";
// import Footimg3 from "../Assets/instagramImg.png";
import { Link } from "react-router-dom"
import { Store } from '../context/store';

function Footer(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let [theater, setTheater] = useState([]);
    let Lstyles = {
        textDecoration: "none",
        color: "white",

    };
    let [Location, setLocation] = useState();

    useEffect(() => {
        loadLocations();
        loadTheaters();
    }, []);

    let loadLocations = () => {
        let url = mainUrl + "/locations";
        console.log(url)
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setLocation(res)
            });
    };
    let loadTheaters = () => {
        let url = mainUrl + "/theaters";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setTheater(res)
            });

    };

    return <>
        <div className="FootSec">
            <br />
            <div className="Footsec1">
                <div className="FootSec1a">
                    <ul>
                        <p>Cinema Locations</p>
                        {
                            theater?.map((e) => {
                                let route = '/single-theater/' + e._id;
                                return (
                                    <li style={{ color: "white", listStyle: "none" }} ><Link onClick={props.reload} style={Lstyles} style={{ color: 'white' }} to={route}> {e.name}</Link></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="FootSec1b">
                    <p style={{ color: "white" }}>About Show world </p>
                    <Link to="/advertising" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >Advertising</li></Link>
                    <Link to="/careers" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >Careers</li></Link>
                    <Link to="/gift" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >Big Screens & Gift Cards</li></Link>
                    <Link to="/news" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >News & Press</li></Link>

                    {/* <div className="FootSocial"> 
                        <div className="FootSocialCT">
                            <a href="www.facebook.com">
                                <img src={Footimg1} alt=""/>
                            </a>
                        </div>
                        <div className="FootSocialCT">
                            <a href="www.instagram.com">
                                <img src={Footimg2} alt=""/>
                            </a>
                        </div>
                        <div className="FootSocialCT">
                            <a href="www.twitter.com">
                                <img src={Footimg3} alt=""/>
                            </a>
                        </div>
                    </div> */}
                </div>

                <div className="FootSec1c">
                    <p style={{ color: "white" }}>Get in touch</p>
                    <Link to="/faq" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >FAQs</li></Link>
                    <Link to="/feedbacks" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >Give us feedbacks</li></Link>
                    <Link to="/contact" style={Lstyles}> <li style={{ color: "white", listStyle: "none" }} >Contact us</li></Link>

                </div>

            </div>
            <div className="FootSec2">
                <div className="FootSecC" style={{ color: "white" }}>
                    <p>Copyright <span style={{ color: "white", fontWeight: "bolder" }}>&#169;</span> SHOW WORLD</p>
                </div>
                <div className="FootSecLink" >
                    <Link to="/home" style={Lstyles}>Home <span style={{ color: "white", fontWeight: "bolder" }}>  |</span></Link>
                    <Link to="/about" style={Lstyles}> About Us <span style={{ color: "white", fontWeight: "bolder" }}>  |</span></Link>
                    <Link to="/contact" style={Lstyles}> Contact Us</Link>
                </div>
            </div>
        </div>
    </>
}

export default Footer;