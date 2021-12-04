import React from 'react';

function DateShowings(props) {
    return <>
        <div className="dates_showing flex" style={props.style}>
            <p onClick={props.date_select}>{props.date2}<br />{props.date}</p>
        </div>
    </>
}

export default DateShowings;