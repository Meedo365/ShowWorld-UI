import React from 'react';

function ScreenView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol">{props.screenName}</div>
                    <div className="tcol">{props.numberOfSeats}</div>
                    <div className="tcol">{props.theaterID}</div>
                    <div className="tcol">{props.classID}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default ScreenView;