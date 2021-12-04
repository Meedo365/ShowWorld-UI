import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import { useRef } from "react";
import logo1 from "../Assets/logo.png";
import { Store } from "../context/store";


export default function Nav() {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let mynavBar = useRef();
    let [theater, setTheater] = useState([]);


    useEffect(() => {
        loadTheaters();
    }, []);

    let loadTheaters = () => {
        let url = mainUrl + "/theaters";
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setTheater(res)
            });
    };


    return (
        <div className="cen">
            <div className="mynav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "75rem", position: "fixed", zIndex: "100", backgroundColor: "maroon" }}>
                <div className="showLogo"><Link to="/home"><img src={logo1} /></Link></div>
                <nav ref={mynavBar} className="navbar  navbar-expand-sm navbar-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse me-2 showUlDiv" id="navbarNav">
                            <ul className="navbar-nav showLi">
                                <li className="nav-item">
                                    <Link className="nav-link active primary " aria-current="page" to="/home">Home</Link>
                                </li>
                                <Dropdown className="d-inline "
                                    style={{ backgroundColor: "transparent", marginTop: "0.1%", outline: "none", border: "none", fontSize: "medium" }}
                                >
                                    <Dropdown.Toggle id="dropdown-autoclose-true SDrop"
                                        style={{ backgroundColor: "transparent", marginTop: "1.0%", outline: "none", border: "none", fontSize: "medium" }}
                                        variant="dark"
                                    >
                                        Movie Locations
                                    </Dropdown.Toggle >

                                    <Dropdown.Menu style={{ backgroundColor: "#fce130", outline: "none" }}>
                                        {
                                            theater?.map((e) => {
                                                let route = '/single-theater/' + e._id;
                                                return (

                                                    <Dropdown.Item style={{ color: "black" }}>
                                                        <Link to={route}>
                                                            {e.name}
                                                        </Link>
                                                    </Dropdown.Item>

                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>

                                <li className="nav-item">
                                    <Link className="nav-link active" to="/buy-ticket">Buy Tickets</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/about">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/contact">Contact Us</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
