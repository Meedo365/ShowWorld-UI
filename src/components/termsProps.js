import React from 'react';

function TermsView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol">{props.description}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default TermsView;