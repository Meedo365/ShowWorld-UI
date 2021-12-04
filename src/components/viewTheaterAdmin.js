import React, { useState, useEffect, useRef, useContext } from "react";
import AdminBar from "./AdminSidebar";
import AdminView from "./adminviewprops";
import { Store } from "../context/store";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function ViewTheaterAdmin() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [close, setClose] = store.closing;
    let [created_by, setCreated] = store.creating;
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);
    let [admin, setAdmin] = useState([]);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [image, setImage] = useState("");
    let [username, setUsername] = useState("");
    let [passwd, setPassword] = useState("");
    let showEdit = useRef();
    let [adminID, setAdminID] = useState("");

    let getCompany = () => {
        let mainCompany = cookie.company;
        let id = cookie.id;
        let dev = cookie.dev;
        if (dev == 'true') {
            setClose('');
            setCreated(id);
        } else {
            setClose('none');
            setCompany(mainCompany);
            setCreated(id);
        }
    };
    getCompany();

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
        loadAdmin()
    }, []);

    let loadAdmin = () => {
        let url = mainUrl + "/admin";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setAdmin(res)
            });
    };

    let editAdmin = (e, i) => {
        if (true) {
            let item = admin[i];
            setName(item.name);
            setEmail(item.email);
            setPassword(item.password);
            setUsername(item.username);
            setImage(item.image);
            setAdminID(e)
        }

        showEdit.current.style.display = 'block'
    };

    let handleAdminUpdate = () => {
        let url = mainUrl + "/admin/" + adminID;
        let items = {
            name,
            email,
            passwd,
            image,
            username
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
                loadAdmin();
            });
        showEdit.current.style.display = 'none'
    };

    let deleteAdmin = (id) => {
        let url = mainUrl + "/admin/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadAdmin(); });


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
                        <div id="myeditUser" className="editform" ref={showEdit}>
                            <form>
                                <input type="text" placeholder=" Full Name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" autoComplete placeholder="New Password" name="password" id="password" value={passwd} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder="Username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="text" placeholder="Image" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                                <input type="button" id="buttonUpdate" value="Update Admin" onClick={() => handleAdminUpdate()} />
                            </form>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <div className="thead flex">
                            <div className="tcol">Image</div>
                            <div className="tcol">name</div>
                            <div className="tcol">email</div>
                            <div className="tcol">username</div>
                            <div className="tcol">password</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {admin.map((e, i) => {
                            if (e.is_theater_admin === true && e.company === cookie.company) {
                                return <AdminView
                                    key={e._id}
                                    name={e.name}
                                    email={e.email}
                                    username={e.username}
                                    image={e.image}
                                    password={e.passwd}
                                    editclick={() => editAdmin(e._id, i)}
                                    deleteclick={() => deleteAdmin(e._id)}
                                />
                            } else if (e.is_theater_admin === true) {
                                return <AdminView
                                    key={e._id}
                                    company={e.company}
                                    name={e.name}
                                    email={e.email}
                                    username={e.username}
                                    image={e.image}
                                    password={e.passwd}
                                    editclick={() => editAdmin(e._id, i)}
                                    deleteclick={() => deleteAdmin(e._id)}
                                />
                            }
                        })}



                    </div>
                </div>
            </div>
        </>

    </>

}

export default ViewTheaterAdmin;