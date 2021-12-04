import React from "react";
// import {Link} from "react-router-dom";



function  Button(props){

       

        return <>
        
      
                 <div className="center">
                    <button onClick={props.click}  className="buttone" style={props.style}>
                       {props.BtnName}
                    </button>
                </div>
        
        
        
        </>

}

export default Button;