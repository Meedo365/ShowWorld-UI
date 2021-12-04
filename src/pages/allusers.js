import React, { useContext, useState, useEffect, useRef } from "react";
import AdminBar from "../components/AdminSidebar";
import { Store } from "../context/store";
import { Link } from "react-router-dom";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function AllUsers() {

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
        loadUser();
    }, []);

    let loadUser = () => {
        let url = "http://localhost:5100/users";
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
        let url = "http://localhost:5100/user/" + userID;
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
        let url = "http://localhost:5100/user/" + id;
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

        <div className="flex">
            <div className="admins" >
                <AdminBar />
                <WebAdminBar />
                <TheaterAdminBar />
                <CounterAdminBar />
            </div>

            <div>
                <div className="admindettails">


                    <Link to="/createuser" style={{ 'color': 'black', 'textDecoration': 'none' }}>
                        <button className="logcreate" style={{ marginLeft: "2px" }}> Create User</button>
                    </Link>
                    <button className="loggout" onClick={() => handleLogOut()} style={{ marginRight: "-50px" }}> LOGOUT</button>
                </div>

                <div className="tabbles"  >
                    <h2>Users</h2>
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

                    <div class="table-wrapper" >
                        <table class="fl-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                    <th>Action</th>


                                </tr>
                            </thead>
                            {user.map((e, i) => {

                                return (

                                    <tbody key={i}>
                                        <tr >
                                            <td>{e.name}</td>
                                            <td>{e.username}</td>
                                            <td>{e.email}</td>

                                            <td><button onClick={() => editUser()} style={{ borderRadius: "4px", background: "cornsilk", color: "crimson", width: "50px", border: "none" }}>Edit </button></td>
                                            <td><button onClick={() => deleteUser()} style={{ borderRadius: "4px", background: "cornsilk", color: "crimson", width: "50px", border: "none" }}>Delete</button></td>


                                        </tr>
                                    </tbody>
                                )

                            })
                            }
                        </table>
                    </div>


                </div>

            </div>
        </div>
    </>

}

export default AllUsers;