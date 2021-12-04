import React, {useState, useRef} from 'react'
import Form from 'react-bootstrap/Form'
// import Button from "react-bootstrap/button"
import { Row, Col } from 'react-bootstrap';

export default function SignUp() {
    function FormExample() {
  const [validated, setValidated] = useState(false);
  let [open, setOpen] = useState("false");
  let [email, setEmail]= useState();
  let [Uname, setUName] = useState();
  let [passwd, setPasswd]= useState();
  let [Cpasswd, setCpasswd]= useState();
  let [phone, setPhone] = useState();
  let [msg, setMsg]=useState()
  let signup= useRef();
  let signin= useRef()

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    let url = "http://172.107.203.98:7001/token";
    let UserDetail = {username:Uname,grant_type:passwd };
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
  const handleSignUp = (event) => { 
      const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);  
    let url = "http://172.107.203.98:7001/api/account/register";
    let UserDetail = {UserName:Uname,confirmPassword:Cpasswd,email,password:passwd,phoneNumber:phone    };
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

  const handleDisplaySU = (event) =>{
   signin.current.style.display="none";
    signup.current.style.display="block"
  

  }

  return (
    <> 
    <div className="formcontainer" ref={signin} >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Text className="text-muted light">
        {msg}
     </Form.Text>
     <Form.Group as={Col} md="9" controlId="validationCustomUsername">
         <Form.Label>Username</Form.Label>
            <Form.Control
             type="text"
             placeholder="Username"
             aria-describedby="inputGroupPrepend"
             required
             name="username" value={Uname} 
             onChange={(e)=> setUName(e.target.value)}
           />
           <Form.Control.Feedback>
               Looks good!
           </Form.Control.Feedback>
        
       </Form.Group>
        <br/>
        <Form.Group as={Col} md="9"controlId="validationCustom01">
          <Form.Label> Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            defaultValue="000000"
            name="grant_type" value={passwd} 
            onChange={(e)=> setPasswd(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      <br/>
      <Form.Group className="mb-3" style={{color:"red", fontWeight:"500"}}>
            <Form.Text className="text-muted">
            If you do not have an account, <b onClick={handleDisplaySU} style={{cursor:"pointer", color:"white"}}>sign up</b> here
            </Form.Text>
      </Form.Group>
//       <Button style={{backgroundColor:"Teal", border:"none"}}className="signUpBtn"  type="submit">Submit</Button>
            <button style={{ backgroundColor: "Teal", border: "none" }} className="signUpBtn" type="submit">Submit</button>
    </Form>
    </div>
    
     

       <div className="formcontainer" ref={signup}  style={{display:"none"}}>
       <Form noValidate validated={validated} onSubmit={handleSignUp}
       >
       
       <Form.Group as={Col} md="9" controlId="validationCustom03">
         <Form.Label>Email</Form.Label>
         <Form.Control 
         type="text" 
         placeholder="Email" 
         required
         defaultValue="johndoe@email.com"
         name="email" value={email} 
         onChange={(e)=> setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
     We'll never share your email with anyone else.
     </Form.Text>
         <Form.Control.Feedback type="invalid">
           Please provide your email address.
         </Form.Control.Feedback>
       </Form.Group>
       <br/>
     <Row className="mb-2">
       <Form.Group as={Col} sm="6" md="6"controlId="validationCustom01">
         <Form.Label> Password</Form.Label>
         <Form.Control
           required
           type="password"
           placeholder="Password"
           defaultValue="000000"
           name="password" value={passwd} 
           onChange={(e)=> setPasswd(e.target.value)}
         />
         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
       </Form.Group>
       <Form.Group as={Col} sm="6" md="6"controlId="validationCustom02">
         <Form.Label>Confirm Password</Form.Label>
         <Form.Control
           required
           type="password"
           placeholder="Confirm Password "
            name="confirmPassword" value={Cpasswd} 
           onChange={(e)=> setCpasswd(e.target.value)}
           
         />
         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
       </Form.Group>
     </Row>
     <br/>
     <Form.Group as={Col} md="9" controlId="validationCustomUsername">
         <Form.Label>Username</Form.Label>
            <Form.Control
             type="text"
             placeholder="Username"
             aria-describedby="inputGroupPrepend"
             required
             name="UserName" value={Uname} 
             onChange={(e)=> setUName(e.target.value)}
           />
           <Form.Control.Feedback>
               Looks good!
           </Form.Control.Feedback>
        
       </Form.Group>
    
       <br/>
       <Form.Group as={Col} md="9" controlId="validationCustomUsername">
         <Form.Label>Phone Number</Form.Label>
            <Form.Control
             type="number"
             placeholder="Phone No"
             aria-describedby="inputGroupPrepend"
             required
             defaultValue="123456789"
             name="phoneNumber" value={phone} 
             onChange={(e)=> setPhone(e.target.value)}
           />
           <Form.Control.Feedback type="invalid">
             Please input your number.
           </Form.Control.Feedback>
        
       </Form.Group>
    
     {/* <Row className="mb-3"> */}
           
     
     {/* </Row> */}
     <br/>
     <Form.Group className="mb-3" style={{color:"red", fontWeight:"500"}}>
       <Form.Check
         required
         label="Agree to terms and conditions"
         feedback="You must agree before submitting."
         feedbackType="invalid"
       />
     </Form.Group>
//      <Button style={{backgroundColor:"Teal", border:"none"}}className="signUpBtn"  type="submit">Submit</Button>
      <button style={{ backgroundColor: "Teal", border: "none" }} className="signUpBtn" type="submit">Submit</button>
   </Form>
   </div>


</>
  
  )
};

return(<FormExample />);
}
