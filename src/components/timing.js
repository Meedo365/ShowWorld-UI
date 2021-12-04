import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useCookies } from 'react-cookie';

function ThisMovieTime(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let route = '/seats/' + props.id;
    let [, SetCookie] = useCookies([]);
    let chooseTime = (e, i) => {
        SetCookie('time', e, { path: '/' })
        SetCookie('price', i, { path: '/' })
    };

    return <>
        <div className='movied'>
            <div style={{ marginTop: '0px' }}>
                <h4>{props.date2} {props.date}</h4>
                <div className="movie_time flex">
                    <Link to={route}>
                        <div className="flex">
                            {props.time.map((e) => {
                                return (
                                    <p style={{ cursor: 'pointer' }} onClick={() => chooseTime(e.time, e.price)}>{e.time}</p>
                                )
                            })}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default ThisMovieTime;