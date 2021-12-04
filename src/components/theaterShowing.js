import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Store } from "../context/store";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

function TheTheater(props) {
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    let route = '/seats/' + props.id;
    console.log(props.date, props.date2)

    return <>
            <div className='movied'>

                <div style={{ marginTop: '25px' }}>
                    {/* <label style={{ color: 'white', fontWeight: '600', fontSize: '1.2rem' }}>
                        Select a Cinema
                    </label> <br /> */}
                    {/* <select>
                        <option>{props.theater}</option>
                    </select> */}

                    {/* <p>{props.theater}</p> */}
                </div>
            </div>
    </>
}

export default TheTheater;