import React, { useEffect, useState, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import ScreenView from "./screenProps";
import TicketbookingView from "../components/ticketprops";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewTicketbooking() {
    let store = useContext(Store)
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
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
    let [ticketbooking, setTicketbooking] = useState([]);
    let [moviebooking, setMoviebooking] = useState("");
    let [users, setUsers] = useState("");
    let [TicketId, setTicketId] = useState(null);

    let showEdit = useRef();

    let deleteTicketbooking = (id) => {
        let url = mainUrl + "/ticketbookings/" + id
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadTicket(); });


    };

    useEffect(() => {
        loadTicket();
    }, [])

    let loadTicket = () => {
        let url = mainUrl + "/ticketbookings"
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setTicketbooking(res)
            });
    };
    let editTicket = (i) => {
        if (true) {
            let item = ticketbooking[i];
            setUsers(item.user);
            setMoviebooking(item.moviebooking);
            setTicketId(item._id);
        }

        showEdit.current.style.display = 'block'

    };
    let handleTicketUpdate = () => {
        let url = mainUrl + "/ticketbookings/" + TicketId;
        let items = {
            users,
            moviebooking,

        };
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Put",
            body: JSON.stringify(items)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                loadTicket();
            });

        showEdit.current.style.display = 'none'
    };


    return <>
        <>
            <div>
                <h2 id="logout" onClick={() => handleLogOut()}>LOGOUT</h2>
            </div>
            <div className="flex" style={{ 'padding': '100px' }}>
                <div className="adminMain" >
                    <AdminBar />
                    <WebAdminBar />
                    <TheaterAdminBar />
                    <CounterAdminBar />
                </div>

                <div className="adminBody">
                    <div className="editing"  >
                        <div id="myeditUser" className="editform" ref={showEdit} >
                            <div>
                                <input type="text" placeholder="User ID" name="user_id" value={users} onChange={(e) => setUsers(e.target.value)} />
                                <input type="text" placeholder="Moviebooking ID" name="moviebooking_id" value={moviebooking} onChange={(e) => setMoviebooking(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update Screen" onClick={() => handleTicketUpdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Screens</h3>
                        <div className="thead flex">
                            <div className="tcol">User ID</div>
                            <div className="tcol">Moviebooking ID</div>
                            <div className="tcol">Number of Seats</div>
                            <div className="tcol">Booked Seat</div>
                            <div className="tcol">Blocked Seat</div>
                            <div className="tcol">Paid Seat</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>
                        {ticketbooking.map((e, i) => {
                            if (e.company === cookie.company) {
                                return (
                                    <TicketbookingView
                                        key={e._id}
                                        userID={e.user_id}
                                        movieID={e.moviebooking_id}
                                        blockedseat={e.blockedseat}
                                        paidseat={e.paidseat}
                                        bookedseat={e.bookedseat}
                                        deleteclick={() => deleteTicketbooking(e._id)}
                                        editclick={() => editTicket(i)}
                                    />
                                );
                            } else {
                                return (
                                    <TicketbookingView
                                        key={e._id}
                                        company={e.company}
                                        userID={e.user_id}
                                        movieID={e.moviebooking_id}
                                        blockedseat={e.blockedseat}
                                        paidseat={e.paidseat}
                                        bookedseat={e.bookedseat}
                                        deleteclick={() => deleteTicketbooking(e._id)}
                                        editclick={() => editTicket(i)}
                                    />
                                );
                            }
                        }
                        )}

                        {/* below here you map */}
                        <ScreenView />




                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewTicketbooking;