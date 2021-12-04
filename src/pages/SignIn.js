import React, { useEffect, useContext, useRef, useState } from "react";
import { Store } from "../context/store";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';

function SignIn() {
  let store = useContext(Store);
  let [open, setOpen] = store.ShowOpen;
  let [email, setEmail] = store.ShowEmail;
  let [Uname, setName] = store.ShowUname;
  // let [phone, setNum] = Store.ShowPhone;
  let [passwd, setPass] = store.ShowPasswd;
  let [cookie, setCookies] = useCookies(['email', 'password', 'id', 'company', 'web', 'name', 'theater',
    'dev', 'counter', 'site', 'user-email', 'user-name', 'user-company']);
  // let [error, setError] = useState("");
  let history = useHistory();
  let [msg, setMsg] = useState('');
  let [main, setMain] = useState([]);
  let [company, setCompany] = useState('');

  let signupdiv = useRef()
  let TopBtn = useRef()
  let id101 = useRef()

  let Lstyles = {
    textDecoration: "none",
    color: "#fce130"
  }


  let [mainUrl] = store.hosting;



  let date = new Date()
  let hours = date.getHours()
  let TimeOfDay;
  let styles = {
    color: "#fce130",
    fontSize: "small",
  }
  let BStyles = {
    width: "30%",
    height: "40px",
    // background:"white",
    color: "white",
    borderRadius: "10px",
    border: "none"
  }

  if (hours < 12) {
    TimeOfDay = "Morning"
    styles.color = "white"
    styles.fontSize = "60%"
  }
  else if (hours >= 12 && hours < 17) {
    TimeOfDay = "Afternoon"
    styles.color = "yellow"
    styles.fontSize = "60%"
  }
  else {
    TimeOfDay = "Night"
  };

  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      TopBtn.current.style.display = "block";
    } else {
      // TopBtn.current.style.display = "none";
    }
  };


  function topFunction() {
    document.body.scrollTop = 10;
    document.documentElement.scrollTop = 10;
  };

  useEffect(() => {
    loadMain();
    getCompany();
  }, []);
  let getCompany = () => {
    let mainCompany = cookie.site
    setCompany(mainCompany);
  };

  let handleSign = () => {
    let url = mainUrl + "/login";
    let data = { email, passwd };
    fetch(url, {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        if (result.msg) {
          setMsg(result.msg)
        } else {
          setMsg("");
          setCookies('email', result.email, { path: '/' })
          setCookies('password', result.passwd, { path: '/' })
          setCookies('id', result._id, { path: '/' })
          setCookies('user', result.is_user, { path: '/' })
          setCookies('user-email', result.email, { path: '/' })
          setCookies('user-name', result.name, { path: '/' })
          setCookies('user-company', result.company, { path: '/' })
          history.push('/' + cookie.site + "/moviess")
        }
      });
  };

  let handleSignUp = () => {

    let url = mainUrl + "/user";
    let UserDetail = {
      username: Uname,
      email,
      passwd,
      company

    };
    //This is using a fetch promise
    fetch(url, {
      headers: {
        "content-type": "application/json"
      },
      method: "Post",
      body: JSON.stringify(UserDetail)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
      });
    setName("");
    setEmail("");
    setPass("");
    signupdiv.current.style.display = "none";
    history.push('/' + cookie.site + "/signIn")
    setMsg("You have successfully signed up, kindly sign in to continue")

  };

  window.onclick = function (event) {
    if (event.target === id101) {
      id101.current.style.display = "none";
    }
  };

  let handleSU_Open = () => {

    setOpen(true);

  };
  let SignUpCancel = () => {
    setOpen(false);
  };
  let loadMain = () => {
    let url = mainUrl + "/mainsites";
    fetch(url)
      .then((e) => e.json())
      .then((res) => {
        setMain(res)
      });
  };


  return <>

    <div className="Container flex">
      <div className="Sidebar">
        {main.map((e) => {
          return (
            <SideBar
              logo={e.logo}
            />)
        })}
      </div>
      <div className="bodyContainer">


        <Header
          style={styles}
          timer={TimeOfDay}
        />


        <div className="modals ">

          <div className="modalContent ">
            <div className="modalText">
              <div className="modalHeader">
                <br />
                <h2>Sign in to continue</h2>
              </div>
              <div className="modalBody">
                <div className="modalDesc"> <p style={{ color: "red" }}>{msg}</p></div>
                <div className="modalMail">
                  <p>Email Address</p>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="modalMail">
                  <p>Password</p>
                  <input type="email" value={passwd} onChange={(e) => setPass(e.target.value)} required />
                </div>
                <button onClick={() => handleSign()} className="ModalMainBtn"><Link style={{ textDecoration: "none", color: "white" }} >Continue</Link></button>
                <div className="ModalOr "><p>OR</p></div>
                <div className="ModalBtns">
                  <button className="ModalMainBtns" onClick={() => handleSU_Open()} style={{ textDecoration: "none", color: "Black" }}>  Register if you have no account with us</button>
                  {
                    open ?
                      <div ref={signupdiv}>
                        <div Ref={id101} className="Signmodal">
                          <span onClick={() => setOpen(false)} className="close" title="Close Modal">&times;</span>
                          <form className="modalcontent" >
                            <div className="container">
                              <h1>Sign Up</h1>
                              <p>Please fill in this form to create an account.</p>
                              <hr />

                              <input style={{ color: "white", background: 'black' }} type="text" placeholder="Company" name="company" value={company} className='none' onChange={(e) => setCompany(e.target.value)} />
                              <label for="psw"><b>Full Name</b></label><br />
                              <input className="prod-1" type="text" placeholder=" Full Name" name="username" value={Uname} onChange={(e) => setName(e.target.value)} required /><br />

                              <label for="email"><b>Email</b></label><br />
                              <input className="prod-1" type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

                              <label for="psw"><b>Password</b></label><br />
                              <input className="prod-1" type="password" placeholder="*Password (min 6 characters)" name="passwd" value={passwd} onChange={(e) => setPass(e.target.value)} required /><br />
                              <label>
                                <input type="checkbox" checked="checked" name="remember" style={{ marginBottom: "2%" }} /> Remember me
                              </label>

                              <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>


                              <div class="clearfix flex sbw">
                                <button type="button" onClick={() => SignUpCancel()} className="cancelbtn">Cancel</button>
                                <button type="button" onClick={() => handleSignUp()} className="subtn" style={{ textDecoration: "none", color: "white" }}>Continue</button>
                              </div>



                            </div>
                          </form>
                        </div>

                      </div>
                      : ""
                  }

                  <button className="ModalMainBtns"><Link to="/home" style={{ textDecoration: "none", color: "Black" }} >Continue with Google</Link></button>
                  <button className="ModalMainBtns"><Link to="/home" style={{ textDecoration: "none", color: "Black" }} >Continue with Facebook</Link></button>


                </div>
              </div>
              <div className="modalFooter">
                <p>By clicking Continue or Continue with Google or<br />
                  Facebook you agree to our Terms of<br /> Use  and Privacy Policy. Show World may send you <br />
                  communications; you may change your preferences<br /> in your account settings. We'll never post without <br />
                  your permission.</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <button onClick={() => topFunction()} ref={TopBtn} className="myBtn" title="Go to top">Top</button>








    <Footer />


  </>

}
export default SignIn;