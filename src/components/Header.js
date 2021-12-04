import React, { useEffect, useState, useContext } from "react";
import Img1 from "../Assets/search icon.jpg"
import Img2 from "../Assets/notification.png"
import Img3 from "../Assets/avatar.png"
import axios from "axios"
import { Link } from "react-router-dom"
import { Store } from '../context/store';
import { useCookies } from 'react-cookie';

function Header(props) {
    let store = useContext(Store);
    let [cookie] = useCookies(['site']);
    let [mainUrl] = store.hosting;
    const [, setData] = useState([])
    const [title, setTitle] = useState("")
    const [output, setOutput] = useState([])

    let styles = {
        textDecoration: "none",
        color: "black",
        border: "none",

    };

    useEffect(() => {
        async function getData() {
            const res = await axios.get(mainUrl + "/movies/")
            setData(res.data)
        }
        getData()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(mainUrl + `/search?title=${title}`)
            console.log(res)
            setOutput(res.data.movies)
        } catch (err) {
            console.log(err)
        }
    }



    return <>
        <div className="HeadBar ">
            <ul className=" HeadBarContent flex ">
                <div className="SearchBar flex">
                    <img src={Img1} alt="" />
                    <form onSubmit={handleSearch}>
                        <input style={styles} value={title} name="title" onChange={e => setTitle(e.target.value)} placeholder="Search" />

                        <div className="output">
                            {
                                title && output.map(e => {
                                    return (
                                        <li key={e._id}>
                                            <Link style={{ color: 'black' }} to={`/${cookie.site}/singlemovie/${e._id}`}> {e.title} </Link>
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </form>
                </div>
                <div className="notificationBar flex">

                    <div className="notification">
                        <img src={Img2} alt="" />
                        <p style={props.style}>Notifications</p>
                    </div>
                    <div className="avatar">
                        <img src={Img3} alt="" />
                        <p style={props.style}> {props.timer} User!</p>
                    </div>
                </div>

            </ul>

        </div>

    </>
}

export default Header;