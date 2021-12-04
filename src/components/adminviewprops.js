import React from 'react';

function AdminView(props) {
    return (
        <>
            <div className="tbody ">
                <div className="trow flex">
                    <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div>
                    <div className="tcol"><img src={"http://localhost:5100" + props.image} alt="" /></div>
                    <div className="tcol">{props.name}</div>
                    <div className="tcol" id="email">{props.email}</div>
                    <div className="tcol">{props.username}</div>
                    <div className="tcol" >{props.password}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                </div>
            </div>

        </>
    );
}

export default AdminView;