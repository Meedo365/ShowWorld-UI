import React from 'react';

function TicketbookingView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol">{props.userID}</div>
                    <div className="tcol">{props.movieID}</div>
                    <div className="tcol">{props.blockedseat}</div>
                    <div className="tcol">{props.paidseat}</div>
                    <div className="tcol">{props.bookedseat}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default TicketbookingView;