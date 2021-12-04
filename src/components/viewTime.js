import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import TimeView from "./timeprops";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewTime() {
    let store = useContext(Store)
    let history = useHistory();
    let [cookie, setCookies, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);

    let [mainUrl] = store.hosting;
    let handleLogOut = async () => {
        let id = cookie.id;
        let email = cookie.email;
        let passwd = cookie.password;
        let active = false;
        let url = mainUrl + id;
        let data = { email, passwd, active };
        if (window.confirm('Are you sure, you want to LogOut?')) {
            await axios.put(url, data).data;
            removeCookie();
            history.push("/login")
        }
    };
    let [times, setTimes] = useState([]);
    let [company, setCompany] = useState("");
    let [createdby, setCreatedby] = useState("");
    let [date, setDate] = useState("");
    let [price, setPrice] = useState("");
    let [movietime, setMovietime] = useState("");
    let [timeId, setTimeId] = useState(null);
    let showEdit = useRef();
    let [close, setClose] = useState('')



    useEffect(() => {
        loadTime()
    }, [])
    let loadTime = () => {
        let url = mainUrl + "/times";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setTimes(res)
            });
    }
    let editTime = (e, i) => {
        if (true) {
            let item = times[i];
            setCompany(item.company);
            setMovietime(item.movietime);
            setDate(item.date)
            setPrice(item.price)
            setCreatedby(item.date);
            setTimeId(item._id);
        }
        showEdit.current.style.display = 'block'
    }
    let handleTimeupdate = () => {
        let url = mainUrl + "/time/" + timeId
        let items = {
            time: movietime,
            date,
            price,
        };
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(items)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                loadTime();
            });
        showEdit.current.style.display = 'none'
    }
    let deleteTime = (id) => {
        let url = mainUrl + "/time/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadTime(); });


    };


    return <>
        <div>
            <h2 id="logout" onClick={() => handleLogOut()}>LOGOUT</h2>
        </div>
        <>
            <div className="flex" style={{ 'padding': '100px' }}>
                <div className="adminMain" >
                    <AdminBar />
                    <WebAdminBar />
                    <TheaterAdminBar />
                    <CounterAdminBar />
                </div>

                <div className="adminBody">
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" ref={showEdit}>
                            <div>
                                <input type="time" placeholder="Movie Time" name="time" value={movietime} onChange={(e) => setMovietime(e.target.value)} />
                                <input type="number" placeholder="Price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <input type="date" placeholder="Date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update" onClick={() => handleTimeupdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Movie Times</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">CreatedBy</div>
                            <div className="tcol">Date</div>
                            <div className="tcol">Time</div>
                            <div className="tcol">Price</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {times.map((e, i) => {
                            if (e.company === cookie.company) {
                                return <TimeView
                                    key={e._id}
                                    // createdby={e.created_by}
                                    price={e.price}
                                    date={e.date}
                                    time={e.time}
                                    editclick={() => editTime(e._id, i)}
                                    deleteclick={() => deleteTime(e._id)}
                                />
                            } else if (e.is_dev_admin === true) {
                                return <TimeView
                                    key={e._id}
                                    company={e.company}
                                    createdby={e.created_by}
                                    price={e.price}
                                    date={e.date}
                                    time={e.time}
                                    editclick={() => editTime(e._id, i)}
                                    deleteclick={() => deleteTime(e._id)}
                                />
                            }
                        })}
                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewTime;