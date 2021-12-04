import React, { useContext } from 'react';
import { Store } from "../context/store"


function BannerView(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol"><img src={mainUrl + props.url} alt="" /></div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default BannerView;