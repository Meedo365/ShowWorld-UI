import React from 'react';

function CinemaView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#FCE130" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.cinemaName}</div>
                    <div className="tcol">{props.numberOfTheaters}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default CinemaView;