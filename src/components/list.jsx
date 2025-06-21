import React from "react";
import "./list.css";


export default function List(props){
    return(
        <div className="Content">
            <input type="checkbox" className="check " onChange={props.clicky}></input>
            <p  className="task" >{props.text}</p>      
        </div>
    );
}