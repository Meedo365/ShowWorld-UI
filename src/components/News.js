import React from "react";
import img1a from "../Assets/MB_Img.jpg";
import img2 from "../Assets/MB1.jpg";
import img3 from "../Assets/MB2.jpg";
import img4 from "../Assets/MB3.jpg";
import Button from "./Button";

function News(props){

    let BStyles={
            width:"30%",
            height:"40px",
            // background:"white",
            color:"white",
            borderRadius:"10px",
            border:"none"
        }

        return <>
                <div className="NewsHead"><h3>LATEST NEWS</h3></div>
                {/* <hr className="Nline"/> */}
                <br/>
                <div className="NewsCon">
                    <div className="NewsSec">
                            <div className="NewsSec1">
                                <div><img src={img3} alt=""/></div>
                                <h5>Lorem Ipsum</h5>
                                <Button
                                    style={BStyles}
                                    BtnName="Read More"
                                />
                            </div><br/><br/>
                            <div className="NewsSec1">
                                <div><img src={img2} alt=""/></div>
                                <h5>Lorem Ipsum</h5>
                                <Button
                                    style={BStyles}
                                    BtnName="Read More"
                                />
                            </div><br/><br/>
                    </div>
                    <div className="NewsSec">
                          <img src={img1a} alt=""/>
                          <h5>Lorem Ipsum</h5>
                          <Button
                                    style={BStyles}
                                    BtnName="Read More"
                                />
                    </div>
                    <div className="NewsSec">
                            <div className="NewsSec1">
                                <div><img src={img2} alt=""/></div>
                                <h5>Lorem Ipsum</h5>
                                <Button
                                    style={BStyles}
                                    BtnName="Read More"
                                />
                            </div><br/><br/>
                            <div className="NewsSec1">
                                <div><img src={img4} alt=""/></div>
                                <h5>Lorem Ipsum</h5>
                                <Button
                                    style={BStyles}
                                    BtnName="Read More"
                                />
                            </div><br/><br/>
                    </div>
                </div>
        
        
        
        
        </>


}


export default News;