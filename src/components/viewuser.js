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

function ViewUsers() {
    let store = useContext(Store);
    let [company, setCompany] = store.mainCompany;
    let [user, setUser] = useState([]);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [image, setImage] = useState("");
    let [username, setUsername] = useState("");
    let [passwd, setPassword] = useState("");
    let showEdit = useRef();
    let [userID, setUserID] = useState("");
    let history = useHistory();
    let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
        'theater', 'dev', 'counter']);

    let getCompany = () => {
        let mainCompany = cookie.company;
        setCompany(mainCompany)
    };
    getCompany()

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
        loadUser()
    }, [])
    let loadUser = () => {
        let url = mainUrl + "/users";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                setUser(res)
            });
    };
    let editUser = (e, i) => {
        if (true) {
            let item = user[i];
            setName(item.name);
            setEmail(item.email);
            setPassword(item.password);
            setUsername(item.username);
            setImage(item.image);
            setUserID(e)
        }

        showEdit.current.style.display = 'block'
    };
    let handleUserUpdate = () => {
        let url = mainUrl + "/user/" + userID;
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
                loadUser();
            });
        showEdit.current.style.display = 'none'
    };
    let deleteUser = (id) => {
        let url = mainUrl + "/user/" + id;
        fetch(url, {
            headers: {
                "content-type": "application/json"
            },
            method: "Delete",
        })
            .then((e) => e.json())
            .then(() => { alert("Operation Successful"); loadUser(); });


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
                                <input type="button" id="buttonUpdate" value="Update User" onClick={() => handleUserUpdate()} />
                            </form>
                        </div>
                    </div>




                    <div className="adminTable" style={{ 'marginTop': '30px' }}>
                        <div className="thead flex">
                            {/* <div className="tcol">Image</div> */}
                            <div className="tcol">name</div>
                            <div className="tcol">email</div>
                            <div className="tcol">username</div>
                            <div className="tcol">password</div>
                            <div className="tcol1">edit</div>
                            <div className="tcol1">delete</div>
                        </div>

                        {/* below here you map */}
                        {user.map((e, i) => {
                            if (e.is_user === true && e.company == company) {
                                return <AdminView
                                    key={e._id}
                                    name={e.name}
                                    email={e.email}
                                    username={e.username}

                                    password={e.passwd}
                                    editclick={() => editUser(e._id, i)}
                                    deleteclick={() => deleteUser(e._id)}
                                />
                            } else if (e.is_user === true) {
                                return <AdminView
                                    key={e._id}
                                    company={e.company}
                                    name={e.name}
                                    email={e.email}
                                    username={e.username}

                                    password={e.passwd}
                                    editclick={() => editUser(e._id, i)}
                                    deleteclick={() => deleteUser(e._id)}
                                />
                            }
                        })}



                    </div>
                </div>
            </div>
        </>

    </>

}

export default ViewUsers;