import React, { useContext } from 'react';
import { Store } from "../context/store"

function MainView(props) {
    let store = useContext(Store)
    let [mainUrl] = store.hosting;
    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.siteName}</div>
                    <div className="tcol">{props.admin_mail_id}</div>
                    <div className="tcol">{props.keywords}</div>
                    {/* <div className="tcol">{props.site_url}</div> */}
                    <div className="tcol"><img src={mainUrl + props.logo} alt="" /></div>
                    <div className="tcol">{props.service_fee}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default MainView;