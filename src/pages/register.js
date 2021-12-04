import React from "react";
import Nav from "../components/Nav";
import SignUp from "../components/SignUp";
import Carousel from 'react-bootstrap/Carousel';


function Register(){
    return<>
        <section className="banner">
                <Nav/>
                {/* <section className=" pt-5 h-500 text-black d-flex flex-column justify-content-center align-items-center flex-wrap" > */}
                  <br/><br/> 
                   <SignUp/>
            {/* </section> */}
        </section>
    </>
}


export default Register;