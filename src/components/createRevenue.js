import React, { useContext, useState } from "react";
import { PaystackButton } from "react-paystack"
import AdminBar from "./AdminSidebar";
import WebAdminBar from '../components/WebAdminSidebar';
import TheaterAdminBar from '../components/TheaterAdminSidebar ';
import CounterAdminBar from '../components/CounterSidebar';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Store } from "../context/store";

function CreateRevenue() {
  let store = useContext(Store);
  let [created_by, setCreated] = store.creating;
  let [company, setCompany] = store.mainCompany;
  let [close, setClose] = store.closing;
  let history = useHistory();
  let [cookie, removeCookie] = useCookies(['email', 'password', 'id', 'company', 'web', 'name',
    'theater', 'dev', 'counter']);
  const publicKey = "pk_test_332dac7ec4c199f3168acb3f6cb84050e526aeb9"
  const amount = 1000000
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  }
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
  function check() {
    alert("mooooo")
  }
  return <>
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
        <h3 id="create">Create Revenue</h3>
        <div className="editform">
          <h3>Details</h3>
          <div className="item">
            <img />
            <div className="item-details">
              <p>Dancing Shoes</p>
              <p>{amount}</p>
            </div>
          </div>
          <div className="checkout-form">
            <form>
              <label>Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </form>
            <PaystackButton onClick={() => check()} {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default CreateRevenue;