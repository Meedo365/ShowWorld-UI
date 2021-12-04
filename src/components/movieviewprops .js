import React, { useContext } from 'react';
import { Store } from "../context/store"

function MovieView(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let handleLogOut = async () => {
        let id = cookie.id;
        let email = cookie.email;
        let passwd = cookie.password;
        let active = false;
        let url = mainUrl + id;
        let data = { email, passwd, active };
        if (window.confirm('Are you sure, you want to LogOut?')) {
            await axios.put(url, data).data;
            removeCookie();
            history.push("/login")
        }
    };


    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol"><img src={mainUrl + props.image} alt="" /></div>
                    <div className="tcol">{props.title}</div>
                    <div className="tcol">{props.synopsis}</div>
                    <div className="tcol">{props.trailer_link}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default MovieView;