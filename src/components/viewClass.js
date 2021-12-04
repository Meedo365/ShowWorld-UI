import React, { useContext, useEffect, useRef } from "react";
import { Store } from "../context/store";
import AdminBar from "./AdminSidebar";
import ClassView from "./classProps";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


function ViewClass() {
    let store = useContext(Store);
    let [classes, setClasses] = store.classArr;
    let [classId, setClassId] = store.class_id;
    let [name, setName] = store.name;
    let [msg, setMsg] = store.msg;
    let btnHide = useRef();
    let btnShow = useRef();
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

    useEffect(() => {
        viewClass();
    }, []);

    function viewClass() {
        let url = mainUrl + "/classes";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                setClasses(result);
                console.log(result);
            });
    };
    function editClass(i) {
        console.log(classes[i]);
        let item = classes[i];
        setName(item.name);
        setClassId(item._id);
        btnHide.current.style.display = 'block';
        btnShow.current.style.display = 'none';

    };
    function updateClass() {
        let item = { name };
        let url = mainUrl + " /class/" + classId;
        console.warn(classId, url, item)

        fetch(url, {
            headers: {
                'content-type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(item)

        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                viewClass();
                btnHide.current.style.display = 'none';
                btnShow.current.style.display = 'block';
            });
    };
    function deleteClass(id) {
        let url = mainUrl + "/class/" + id;
        if (window.confirm("are u sure")) {
            fetch(url, {
                headers: {
                    'content-type': 'application/json'
                },
                method: "DELETE",

            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    viewClass();
                    btnHide.current.style.display = 'none';
                    btnShow.current.style.display = 'block';
                });
        }

    };
    function cancel() {
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'block';
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
                        <div id="myeditUser" className="editform" ref={btnHide} style={{ display: "none" }}>
                            <div>
                                <div className="error_msg" style={{ color: "red" }}> {msg && <p>{msg}</p>} </div>
                                <form>
                                    <input type="text" placeholder="Name of Cinema" value={name} onChange={(e) => setName(e.target.value)} />
                                    <button id="createBtn" type="button" onClick={() => updateClass()}>Update</button>
                                    <button id="createBtn" type="button" onClick={() => cancel()}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }} ref={btnShow} style={{ display: "block" }}>
                        <h3>Classes</h3>
                        <div className="thead flex">
                            <div className="tcol">Company</div>
                            <div className="tcol">Class Type</div>
                            <div className="tcol">Price</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {
                            classes.map((e, i) => {
                                if (e.company === cookie.company) {
                                    return (
                                        <ClassView
                                            key={e._id}
                                            className={e.name}
                                            price={e.price}
                                            editclick={() => editClass(i)}
                                            deleteclick={() => deleteClass(e._id)}

                                        />
                                    )
                                } else if (cookie.dev === 'true') {
                                    return (
                                        <ClassView
                                            key={e._id}
                                            company={e.company}
                                            className={e.name}
                                            price={e.price}
                                            editclick={() => editClass(i)}
                                            deleteclick={() => deleteClass(e._id)}

                                        />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>

    </>
}

export default ViewClass;