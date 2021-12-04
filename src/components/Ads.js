import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import Img1 from "../Assets/backdrop1.jpg";
import Img2 from "../Assets/backdrop2.jpg";

function Ads(props){
    let styles={
        textDecoration: "none",
        color: "white",
        backgroundImage: `url(${Img1})` 
    }

    

        let image=[Img1, Img2]
        let num = Math.floor(Math.random()*image.length)
        let img=image[num]

        if(window.onload){
            styles.backgroundImage= `url(${img})`;
            alert("true")
        }
        // else{alert("false")}
        


    return <>
        <div className="AdCon">
            <div  className="AdBanner" style={styles}>
                <div className="AdContent">
                    <div className="Adtitle">
                        <h2>This is the ad section</h2>
                    </div>
                    <div className="AdImg">
                          <img src={props.image} alt=""/>
                    </div>
                    <div className="AdDesc">
                        <p>{props.desc}</p>
                    </div>
                   
                </div>
            </div>
        </div>
    
    
    
    </>

};

export default Ads;