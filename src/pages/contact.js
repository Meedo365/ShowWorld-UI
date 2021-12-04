import React, { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import SignUp from "../components/SignUp";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
import ConCover from "../Assets/contactCover.jpg"
import ChatImg from "../Assets/chatter.png"
import Form from 'react-bootstrap/Form'
// import Button from "react-bootstrap/button"
import { Row, Col } from 'react-bootstrap';
                                                                                                                                        
function Contacting(){
    function FormExample(){

        let ChatIcon=useRef();
        const [validated, setValidated] = useState(false);
        let [open, setOpen] = useState("false");
        let [message, setMsg]= useState();
        let [Fname, setFName] = useState();
        let [email, setEmail]= useState();
         let signup= useRef();
        let signin= useRef()
      
        const handleSubmit = (event) => {
          const form = event.currentTarget;
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
      
          setValidated(true);
          let url = "";
          let UserDetail = {fullname:Fname,Email:email,Comment:message };
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
      
        // const handleDisplaySU = () =>{
        //   ChatIcon.current.style.display="none";
        //   signup.current.style.display="block"
        
      
        // }
        // const SignUpCancel = () =>{  
        //   signup.current.style.display="none"  
        //   ChatIcon.current.style.display="block";
        // }
        //       window.onscroll = function() {scrollFunction()};
          
        //       function scrollFunction() {
        //           if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        //               ChatIcon.current.style.display = "block";
        //           } 
        //           // else {
        //           //     ChatIcon.current.style.display = "none";
        //           // }
        //         };
          
          
        //         function handleChat() {
        //           document.body.scrollTop = 10;
        //           document.documentElement.scrollTop = 10;
        //         };
                 
             

    return<>

        <div className="maincen">
          <div className="cen">  
            <section className="banner">
                        <Nav/>
                        <br/><br/> 
                        <div style={{height:"300px", background:"black"}}>
                            <div>
                                    <h4 style={{fontSize:"55px", color:"white", paddingTop:"15%", paddingLeft:"5%"}}>Contact Us</h4>                          
                            </div>
                        </div>
                <br/> <br/> <br/>
                        <div className="ContactDesc" style={{height:"auto", background:"white", textAlign:"justify"}}>
                            <div className="ContactDescForm"> 
                              
                     <div >
                         
                           <div className="formcontainers" ref={signup} >
                           {/* <span onClick={SignUpCancel} className="close" title="Close">&times;</span><br/><br/> */}
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Text className=" " style={{textAlign:"center", fontSize:"14px", color:"white", marginBottom:"5%", backgroundColor:"maroon", padding:"2% 4%"}}>
                            Please fill out the form below and we will get back to you as soon as possible.
                          </Form.Text>
                        <Form.Group as={Col} md="9" controlId="validationCustomUsername">
                            <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Name"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="fullname" value={Fname} 
                                onChange={(e)=> setFName(e.target.value)}
                               />
                            <Form.Control.Feedback type="invalid">
                                Please provide your full name
                            </Form.Control.Feedback>
                            
                        </Form.Group>
                            <br/>
                         <Form.Group  as={Col} md="9" controlId="validationCustom03">
                         <Form.Label>Email</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Email" 
                                required
                                // defaultValue="johndoe@email.com"
                                name="email" value={email} 
                                onChange={(e)=> setEmail(e.target.value)}
                                />
                                <Form.Text style={{color:"maroon", textAlign:"center", fontSize:"12px"}}>
                                           We'll never share your email with anyone else.
                               </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                Please provide your email address.
                                </Form.Control.Feedback>
                             </Form.Group>
                          
                        <br/>
                        <Form.Group as={Col} md="9"controlId="validationCustom01">
                            <Form.Label> Comment</Form.Label>
                            <textarea style={{width:"100%"}}
                            required
                            type="text"
                            value={message} 
                             onChange={(e)=> setMsg(e.target.value)}>  </textarea>
                           
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                            </Form.Group>
                            <br/>
                        
//                         <Button style={{backgroundColor:"maroon", border:"none"}}className="signUpBtn"  type="submit">Submit</Button>
                              
                      <button style={{ backgroundColor: "maroon", border: "none" }} className="signUpBtn" type="submit" s>submit</button>
                        </Form>
                   </div>
        
         
                 </div>
            
            
                            </div>
                            <div className="ContactDescImg">
                                <div><img src={ConCover} alt="" /></div>
                            </div>
                        </div>

                    <Partners/>
                        <Chat/>
                        
                </section>
                <Footer/>
      </div>
 
        </div>
     </>
  }
  return(<FormExample />);
}


export default Contacting;
