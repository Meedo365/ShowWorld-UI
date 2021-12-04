import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import ContactView from "./contactProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from '../context/store';

function ViewContact() {
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

    let [contact, setContact] = useState([]);
    let [cinemaId, setCinemaID] = useState("");
    let [phone, SetPhone] = useState("");
    let [address, SetAddress] = useState("");
    let [news_body, setNewsBody] = useState("");
    let showEdit = useRef();
    let [contactID, setContactID] = useState("")

    useEffect(() => {
        loadContact()
    }, [])
    let loadContact = () => {
        let url = mainUrl + "/contacts";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setContact(res)
            });
    };
    let editContact = (e, i) => {
        if (true) {
            let item = contact[i];
            // setCinemaID(item.cinemaId);
            SetPhone(item.phone);
            SetAddress(item.address);
            setContactID(e)
        }

        showEdit.current.style.display = 'block'
    };
    let handleContactUpdate = () => {
        let url = mainUrl + "/contact/" + contactID;
        let items = {
            cinemaId,
            phone,
            address
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
                loadContact();
            });
        showEdit.current.style.display = 'none'
    };
    let deleteContact = (id) => {
        let url = mainUrl + "/contact/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => {
                alert("Operation Successful");
                loadContact();
            });


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
                        <div id="myeditUser" className="editform" >
                            <div>
                                <input type="text" placeholder="Cinema Phone" name="number" value={phone} onChange={(e) => SetPhone(e.target.value)} />
                                <input type="text" placeholder="Cinema Address" name="address" value={address} onChange={(e) => SetAddress(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update Contact" />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Contacts</h3>
                        <div className="thead flex">
                            <div className="tcol">Cinema Phone</div>
                            <div className="tcol">Cinema Address</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {contact.map((e, i) => {
                            // if (e.company === cookie.company) {
                            return <ContactView
                                key={e._id}
                                cinemaId={e.cinemaId}
                                cinemaPhone={e.phone}
                                cinemaAddress={e.address}
                                editclick={() => editContact(e._id, i)}
                                deleteclick={() => deleteContact(e._id)}
                            />
                            // } else if (cookie.dev === 'true') {
                            //     return <ContactView
                            //         key={e._id}
                            //         cinemaId={e.cinemaId}
                            //         cinemaPhone={e.phone}
                            //         cinemaAddress={e.address}
                            //         editclick={() => editContact(e._id, i)}
                            //         deleteclick={() => deleteContact(e._id)}
                            //     />
                            // }
                        })}




                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewContact;