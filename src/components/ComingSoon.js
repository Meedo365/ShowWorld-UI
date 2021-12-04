import React, { useState, useEffect, useRef, useContext } from "react";
// import Button from "../components/Button";
import { Store } from "../context/store";


function ComingSoon(props) {
    let store = useContext(Store);
    let [open, setOpen] = useState(false);
    let signupdiv = useRef()
    let [mainUrl] = store.hosting;
    let BStyles = {
        width: "40%",
        height: "40px",
        // background:"white",
        color: "white",
        borderRadius: "10px",
        border: "none"
    }


    return <>
        <div className="NewsSec1">
            <div key={props.key} className="CinZoom">
                <div className="id" style={{ display: "none" }}>{props.id}</div>
                <img src={mainUrl + props.image} alt="" />
                <div class="middle">
                    <div class="text">
                        {props.synopsis}
                    </div>
                </div>
            </div>
            <h5>{props.name}</h5>
            {/* <Button
                style={BStyles}
                BtnName="Read More"
                click={props.click}
            /> */}
            {
                open ?
                    <div ref={signupdiv}>
                        <div className="Newsmodal">
                            <span onClick={() => setOpen(false)} className="close" title="Close Modal">&times;</span>
                            <div className="Nmodalcontent">
                                <div className="Ncontainer">
                                    <p className="Ntext">{props.synopsis}</p>
                                </div>

                            </div>

                        </div>

                    </div>
                    : ""
            }
        </div><br /><br />



    </>

}


export default ComingSoon;

