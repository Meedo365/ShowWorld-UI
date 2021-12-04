import React from 'react';

function ScheduleView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="" style={{ width: "100%" }}>{props.movieID}</div>
                    <div className="tcol">{props.screenID}</div>
                    <div className="tcol">{new Date(props.dateShowing).toDateString()}</div>
                    <div className="tcol">{props.time}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                    <button type="button" className="tcol1" onClick={props.viewone}>View one</button>

                </div>
            </div>

        </>
    );
}

export default ScheduleView;