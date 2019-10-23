import React, { Component } from "react";
import historial from './historial';
import "../css/SideBar.css";

class SideBar extends Component
{
    backArrowClickHandler = () =>{
        const element = document.getElementById("side-nav-bar");
        element.style.width = "0"
    }

    render(){
        return(
            <div id="side-nav-bar">
                <div onClick={this.backArrowClickHandler} id="side-nav-controls">
                    <span id="side-nav-backarrow"><i className="fas fa-chevron-circle-left"></i></span>
                    <span id="side-nav-logo">Caritas</span>
                </div>
                <div id="nav-options">
                    <div onClick={() => {historial.push("/")}} className="nav-option-container"><span className="nav-option-text">Registro</span></div>
                    <div onClick={() => {historial.push("/busqueda")}} className="nav-option-container"><span className="nav-option-text">Busqueda</span></div>
                </div>
            </div>
        )
    }
}


export default SideBar;