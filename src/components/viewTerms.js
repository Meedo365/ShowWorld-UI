import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import TermsView from "./termsProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";


function ViewTerms() {
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
    let [terms, setTerms] = useState([]);
    let [cinemaID, setCinemaID] = useState("");
    let [description, setDescription] = useState("");
    let showEdit = useRef();
    let [termID, setTermID] = useState("")


    useEffect(() => {
        loadTerms()
    }, [])
    let loadTerms = () => {
        let url = mainUrl + "/terms-and-conditions";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setTerms(res)
            });
    }
    let editTerms = (e, i) => {
        if (true) {
            let item = terms[i];
            setCinemaID(item.cinemaID);
            setDescription(item.description);
            setTermID(e)
        }

        showEdit.current.style.display = 'block'
    }
    let handleTermsUpdate = () => {
        let url = mainUrl + "/terms-and-conditions/" + termID;
        let items = {
            cinemaID,
            description
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
                loadTerms();
            });
        showEdit.current.style.display = 'none'
    }
    let deleteTerm = (id) => {
        let url = mainUrl + "/terms-and-conditions/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadTerms(); });


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
                                <input type="text" placeholder="Cinema ID" name="cinemaID" value={cinemaID} onChange={(e) => setCinemaID(e.target.value)} />
                                <input type="text" placeholder="Terms & Condition" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update Terms" onClick={() => handleTermsUpdate()} />
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <h3>Terms & Condition</h3>
                        <div className="thead flex">
                            <div className="tcol">Cinema Name</div>
                            <div className="tcol">Description</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {terms.map((e, i) => {
                            // if (e.cinemaID === "qwerty") {
                            return <TermsView
                                key={e._id}
                                cinemaID={e.cinemaID}
                                description={e.description}
                                editclick={() => editTerms(e._id, i)}
                                deleteclick={() => deleteTerm(e._id)}
                            />
                            // }
                        })}
                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewTerms;