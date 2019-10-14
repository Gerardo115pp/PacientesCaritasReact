import React, { Component } from "react";

class ModalNavBTN extends Component
{
    
    openSideBar = () => {
        const element = document.getElementById("side-nav-bar");
        element.style.width = "20%";
    }
    
    render()
    {

        return(
        <div onClick={this.openSideBar} id="modalnav-btn-container">
            <span id="modalnav-btn-svg"><i className="fas fa-bars"></i></span>
        </div>
        )
    }
}

export default ModalNavBTN;