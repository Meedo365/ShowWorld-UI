import React from 'react';

function TimeView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.createdby}</div>
                    <div className="tcol">{new Date(props.date).toDateString()}</div>
                    <div className="tcol">{props.time}</div>
                    <div className="tcol">${props.price}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default TimeView;