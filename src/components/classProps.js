import React from 'react';

function ClassView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.className}</div>
                    <div className="tcol">{props.price}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default ClassView;