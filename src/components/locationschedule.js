import React, { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { Store } from "../context/store";
import ReactPlayer from "react-player";
import Button from "./Button"

function Locationschedule(props) {

    let store = useContext(Store);
    // let [image, setImage] =Store.pimage;
    // let [name, setName] =Store.info;
    // let [price, setPrice] =Store.pprice;
    let [trailerDate, settrailerDate] = useState();


    let route = "/booking/" + props.id


    let date = new Date(props.release_date);
    let time = date.getHours() + ':' + date.getMinutes();
    console.log(time)


    return <>
        <optgroup label={props.city}>
            <option value={props.theatre}>{props.theatre}</option>
        </optgroup>
    </>
}


export default Locationschedule;