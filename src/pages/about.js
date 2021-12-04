import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import SignUp from "../components/SignUp";
import Carousel from 'react-bootstrap/Carousel';
import ComingSoon from "../components/ComingSoon";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Partners from "../components/Partners";


function About(){
  
    return<>
        <div className="maincen">
          <div className="cen">  
            <section className="banner">
                        <Nav/>
                        <br/><br/> 
                        <div style={{height:"300px", background:"black"}}>
                            <div>
                                    <h4 style={{fontSize:"55px", color:"white", paddingTop:"8%", paddingLeft:"5%"}}>About Us</h4>                          
                            </div>
                        </div>
                <br/>
                        <div className="AboutDesc" style={{height:"auto", backgroundColor:"white", textAlign:"justify"}}>
                            <div>
                               <p><span>We are</span> <br/>
    
                               a leading cinema chain of West Africa with  more than 30 locations, 75 screens and over 7,000 seats in operation across West Africa. Show World is part of the SHow Group, a Nigerian based conglomerate established in 2020 with its key focus on hospitality and entertainment with diverse interests in Restaurants, Hotels, Industrial Catering, Cinemas, Family Entertainment Centres and Facility Management.

                                The Show World Brand and company was launched into the Nigerian market in the year 2021, in Abuja. By the month of September 2021, the company had served over 15 million customers. Show World, has cinemas located in Lagos, Port-Harcourt, Warri, Owerri, Abuja and Asaba. Our strategy to continue to grow in all major cities of the country will have us opening in more locations in the years to come.
                                
                               
                               </p>
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


export default About;