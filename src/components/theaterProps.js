import React from 'react';

function TheaterView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.theaterName}</div>
                    <div className="tcol">{props.locationID}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default TheaterView;