import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';
import '../css/detailsSideBar.css';

//TODO: debo averiguar porque el componente no se modifica cuando actualizo el store de redux, para ya no tener que forzar el renderizado

class DetailsSidebar extends Component
{
    constructor()
    {
        super();
        this.showing_bools = {
            data: false,
            edit_address: false,
            edit_age: false,
            edit_phone: false,
            edit_gender: false
        };
        this.data = {
            name: "",
            address: "",
            age: 0,
            phone: "",
            gender: 1,
            first_seen: ""
        }
        this.state = {
            updates: 0 //esto es completamente inutil, su unico porpocito es forzar el componente a volver a renderizar
        }
    }

    displayBTNClicked = (e,menu_name,padding) => {
        const element = e.currentTarget;
        console.log(element);
        const submenu = document.getElementById(element.getAttribute("closes"));
        let rotation = "";
        if(this.showing_bools[menu_name])
        {
            submenu.removeAttribute("style");
            rotation = "0";
        }
        else
        {
            rotation = "-90";
            submenu.style.maxHeight = `10000px`;
            submenu.style.padding = padding;
        }
        const arrow = element.getElementsByTagName("i")[0];
        if(arrow)
        {
            arrow.style.transform = `rotate(${rotation}deg)`;
        }
        this.showing_bools[menu_name] = !this.showing_bools[menu_name];
        
    }

    closeSelf = e => {
        const element = document.getElementById("d-sidebar");
        element.style.width = "0";
    }

    updatePacientData = async e => {
        if(e.key === "Enter")
        {
            const element = e.currentTarget;
            const attrib = element.getAttribute('for-attrib');
            
            let forma = new FormData();
            forma.append("value_name",attrib);
            forma.append("new_value",element.value);
            forma.append("uuid",this.data.uuid);

            const request = new Request("http://caritasong.000webhostapp.com/php/updatePacientData.php",{method:"POST",body:forma});
            
            let response  = await fetch(request);
            if(response.status === 200)
            {
                let { updates } = this.state;
                console.log("actualizado");
                this.data[attrib] = element.value;
                this.props.updateSelectedResult(this.data);
                const closingBTN = document.querySelector(`i[closes=${element.parentElement.getAttribute("id")}]`);
                closingBTN.click();
                this.setState({
                    updates: ++updates
                })
            }    
        }
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
                <div onClick={e => {this.displayBTNClicked(e,"data",".5em 0 .5em")}} closes="datos-submenu" className="d-menu-option">
                    <h3 className="d-menu-option-text">Datos</h3>
                    <i className="fas fa-caret-left"></i>
                </div>
                <div id="datos-submenu" className="d-submenu">
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Direccion: </span>{this.data.address}</h3>
                        <i closes="editor-address" onClick={e => {this.displayBTNClicked(e,"edit_address","1em 0")}} className="fas fa-pen"></i>
                    </div>
                    <div id="editor-address" className="edit-attrib-submenu">
                        <input for-attrib="address" onKeyDown={this.updatePacientData} type="text" placeholder="Direccion" className="edit-attrib-input"/>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Edad: </span>{this.data.age}</h3>
                        <i closes="editor-age" onClick={e => {this.displayBTNClicked(e,"edit_age","1em 0")}} className="fas fa-pen"></i>
                    </div>
                    <div id="editor-age" className="edit-attrib-submenu">
                        <input for-attrib="age" onKeyDown={this.updatePacientData} type="text" placeholder="Edad" className="edit-attrib-input"/>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Telefono: </span>{this.data.phone}</h3>
                        <i closes="editor-phone" onClick={e => {this.displayBTNClicked(e,"edit_phone","1em 0")}} className="fas fa-pen"></i>
                    </div>
                    <div id="editor-phone" className="edit-attrib-submenu">
                        <input for-attrib="phone" onKeyDown={this.updatePacientData} type="text" placeholder="Telefono" className="edit-attrib-input"/>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Genero: </span>{this.data.gender===0 ? "Hombre" : "Mujer"}</h3>
                        <i closes="editor-gender" onKeyDown={this.updatePacientData} onClick={e => {this.displayBTNClicked(e,"edit_gender","1em 0")}} className="fas fa-pen"></i>
                    </div>
                    <div id="editor-gender" className="edit-attrib-submenu">
                        <input for-attrib="gender" type="text" placeholder="Genero" className="edit-attrib-input"/>
                    </div>
                    <div className="d-submenu-option">
                        <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Primera visita: </span>{this.data.first_seen}</h3>
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