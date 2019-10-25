import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';
import '../css/detailsSideBar.css';

class DetailsSidebar extends Component
{
    constructor()
    {
        super();
        this.showing_data = false;
        this.data = {
            name: "",
            address: "",
            age: 0,
            phone: "",
            gender: 1,
            first_seen: ""
        }
    }

    displayBTNClicked = e => {
        const element = e.currentTarget;
        const submenu = document.getElementById(element.getAttribute("closes"));
        let rotation = "";
        if(this.showing_data)
        {
            submenu.removeAttribute("style");
            rotation = "0";
        }
        else
        {
            rotation = "-90";
            submenu.style.maxHeight = `${submenu.scrollHeight}px`;
            submenu.style.padding = ".5em 0 .5em 4%"
        }
        const arrow = element.getElementsByTagName("i")[0];
        arrow.style.transform = `rotate(${rotation}deg)`;
        this.showing_data = !this.showing_data;
        
    }

    closeSelf = e => {
        const element = document.getElementById("d-sidebar");
        element.style.width = "0";
    }

    render()
    {
        const { selected_result } = this.props.resultsReducer;
        if(selected_result !== null)
        {
            this.data = this.props.resultsReducer.results[selected_result];
        }
        return(
            <div id="d-sidebar">
                <div id="d-menu-title">
                    <h2 id="d-title">{this.data.name}</h2>
                    <i onClick={this.closeSelf} className="fas fa-chevron-circle-right"></i>
                </div>
                <div onClick={this.displayBTNClicked} closes="datos-submenu" className="d-menu-option">
                    <h3 className="d-menu-option-text">Datos</h3>
                    <i className="fas fa-caret-left"></i>
                </div>
                <div id="datos-submenu" className="d-submenu">
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-menu-option-label">Direccion: </span>{this.data.address}</h3>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-menu-option-label">Edad: </span>{this.data.age}</h3>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-menu-option-label">Telefono: </span>{this.data.phone}</h3>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-menu-option-label">Genero: </span>{this.data.gender===0 ? "Hombre" : "Mujer"}</h3>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-menu-option-label">Primera visita: </span>{this.data.first_seen}</h3>
                    </div>
                </div>
                <div className="d-menu-option">
                    <h3 className="d-menu-option-text">Consultas</h3>
                    <i className="fas fa-caret-left"></i>
                </div>
                <div id="new-consulta-btn"></div>
            </div>
        )
    }
}

const mapStateToProps = reducers =>
{
    return{
        resultsReducer: reducers.resultsReducer
    }
}

export default connect(mapStateToProps, resultsActions)(DetailsSidebar);