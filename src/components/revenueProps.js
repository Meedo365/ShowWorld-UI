import React from 'react';

function RevenueView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.bookingID}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default RevenueView;