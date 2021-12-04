import React from 'react';
import { Modal, Button } from "react-bootstrap";

function BookingView(props) {

    return (
        <>
            <div className="tbody ">
                <div className="trow flex" style={{ color: "#fff" }}>
                    {/* <div className="tcol">{props.company}</div>
                    <div className="tcol">{props.created_by}</div> */}
                    <div className="tcol">{props.userID}</div>
                    <div className="tcol">{props.movieID}</div>
                    <div className="tcol">{props.screenId}</div>
                    <div className="tcol">{props.time}</div>
                    <div className="tcol">{new Date(props.date).toDateString()}</div>
                    <div className="tcol">{props.theaterId}</div>
                    <div className="tcol">{props.locationId}</div>
                    <div className="tcol">{props.price}</div>
                    <button type="button" className="tcol1" onClick={props.editclick}>edit</button>
                    <button type="button" className="tcol1" onClick={props.view}>view one</button>
                    <button type="button" className="tcol1" onClick={props.deleteclick}>delete</button>
                    <button type="button" className="tcol1" onClick={props.buyticket}>buy ticket</button>
                    {/* <button type="button" className="tcol1"></button> */}
                    <div>{props.pay.text}</div>


                </div>


            </div>

        </>
    );
}

export default BookingView;

                {/* <Button variant="primary" onClick={props.handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={props.show} onHide={props.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={props.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> */}