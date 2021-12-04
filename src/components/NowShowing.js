import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { Store } from '../context/store';
import { useCookies } from 'react-cookie';

function NowShowing(props) {
    let store = useContext(Store);
    let [cookie] = useCookies(['site']);
    let [mainUrl] = store.hosting;


    let Lstyles = {
        textDecoration: "none",
        color: "white",
    }

    return <>
        <div className="CinBanner" style={Lstyles}>
            <div className="CinZoom">
                <div className="cinImage">
                    {/* <Link to={route} style={props.style}> */}
                    <Link to={`/${cookie.site}/singlemovie/` + props.id} style={props.style}>
                        <img src={mainUrl + props.image} className="image" alt="" />
                    </Link>
                </div>
                <br />
                <div className="">
                    <Link to={`/${cookie.site}/singlemovie/` + props.id} style={props.style}>
                        <Button
                            BtnName={props.cinemaName}
                        />
                    </Link>
                </div>
            </div>
        </div>
    </>
}
export default NowShowing;