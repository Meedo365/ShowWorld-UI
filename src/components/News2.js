import React, { useContext, useRef } from "react";
import Button from "./Button";
import { Store } from "../context/store";

function News2(props) {
    let store = useContext(Store);
    let [open, setOpen] = store.ShowOpen;
    let signupdiv = useRef();
    let [mainUrl] = store.hosting;
    

    let BStyles = {
        width: "30%",
        height: "40px",
        // background:"white",
        color: "white",
        borderRadius: "10px",
        border: "none"
    }

    return <>
        <div className="NewsSec1">
            <div key={props.key}>
                <div className="id" style={{ display: "none" }}>{props.id}</div>
                <h5>{props.head}</h5>
                <div><img src={mainUrl + props.image} alt="" /></div>
                <div class="middle">
                    <div class="text">{props.body}</div>
                </div>
            </div>
            <h5>{props.name}</h5>
            <Button
                style={BStyles}
                BtnName="Read More"
                click={props.click}
                title="Click to read more"
            />
            {
                open ?
                    <div ref={signupdiv}>
                        <div className="Newsmodal">
                            <span onClick={() => setOpen(false)} className="Nclose" title="Close">&times;</span>
                            <div className="Nmodalcontent">
                                <div className="Ncontainer">
                                    <p className="Ntext">{props.body}</p>
                                </div>

                            </div>

                        </div>

                    </div>
                    : ""
            }

        </div><br /><br />



    </>


}


export default News2;