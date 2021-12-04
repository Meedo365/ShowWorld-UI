import React, { useRef, useState } from "react";
// import {Link} from "react-router-dom";
import ChatImg from "../Assets/chatter.png"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/button"
import { Row, Col } from 'react-bootstrap';

function Chat(props) {
  function FormExample() {

    let ChatIcon = useRef();
    const [validated, setValidated] = useState(false);
    let [open, setOpen] = useState("false");
    let [message, setMsg] = useState();
    let [Uname, setUName] = useState();
    let [email, setEmail] = useState();
    let signup = useRef();
    let signin = useRef()

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);
      let url = "";
      let UserDetail = { username: Uname, Email: email, Comment: message };
      fetch(url, {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "Post",
        body: JSON.stringify(UserDetail)
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });


    };

    const handleDisplaySU = (event) => {
      ChatIcon.current.style.display = "none";
      signup.current.style.display = "block"


    }
    const SignUpCancel = (event) => {
      signup.current.style.display = "none"
      ChatIcon.current.style.display = "block";
    }
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        ChatIcon.current.style.display = "block";
      } 
      // else {
      //   ChatIcon.current.style.display = "none";
      // }
    };


    function handleChat() {
      document.body.scrollTop = 10;
      document.documentElement.scrollTop = 10;
    };


    return <>


      <div >
        <div onclick={() => handleChat()} onClick={handleDisplaySU} ref={ChatIcon} className="myBtn" title="let's chat">
          <img src={ChatImg} alt="" />
        </div>
        <div className="formcontainer" ref={signup} >
          <span onClick={SignUpCancel} className="close" title="Close">&times;</span><br /><br />
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Text className=" " style={{ textAlign: "center", fontSize: "medium", color: "white", marginBottom: "5%" }}>
              Please fill out the form below and we will get back to you as soon as possible.
            </Form.Text>
            <Form.Group as={Col} md="9" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                name="username" value={Uname}
                onChange={(e) => setUName(e.target.value)}
              />
              <Form.Control.Feedback>
                Looks good!
              </Form.Control.Feedback>

            </Form.Group>
            <br />
            <Form.Group as={Col} md="9" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                required
                // defaultValue="johndoe@email.com"
                name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text style={{ color: "black", textAlign: "center" }}>
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide your email address.
              </Form.Control.Feedback>
            </Form.Group>

            <br />
            <Form.Group as={Col} md="9" controlId="validationCustom01">
              <Form.Label> Comment</Form.Label>
              <textarea style={{ width: "100%" }}
                required
                type="text"
                value={message}
                onChange={(e) => setMsg(e.target.value)}>  </textarea>

              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
            <br />

            <Button style={{ backgroundColor: "red", border: "none" }} className="signUpBtn" type="submit">Submit</Button>
          </Form>
        </div>


      </div>



    </>

  }
  return (<FormExample />);
}

export default Chat;