import React,{useContext} from 'react';
import {Store} from "../context/store";


function UpcomingView(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;

    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol">{props.movieName}</div>
                    <div className="tcol"><img src={mainUrl + props.image} alt="" /></div>
                    <div className="tcol">{new Date(props.releaseDate).toDateString()}</div>
                    <div className="tcol">{props.releaseTime}</div>
                    <div className="tcol">{props.cinemaID}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default UpcomingView;