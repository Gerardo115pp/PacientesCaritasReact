import React, { Component } from 'react';
import AppointmentModal from './AppointmentModal';
import { connect } from 'react-redux';
import historial from './historial';
import * as resultsActions from '../actions/resultsActions';
import '../css/detailsSideBar.css';


class DetailsSidebar extends Component
{
    constructor()
    {
        super();
        this.showing_bools = {
            data: false,
            consultas: false,
            edit_name: false,
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
            first_seen: "",
            appointments: {}
        }
        this.state = {
            selected_appointment: {}
        }
    }

    displayBTNClicked = (e,menu_name,padding) => {
        const element = e.currentTarget;
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

    getProperAppointmentName = (timestamp,short=false) => {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciember"];
        const date_object = new Date(timestamp);
        return !short ? `Consulta del ${date_object.getDay()} de ${monthNames[date_object.getMonth()]} del ${date_object.getFullYear()} a las ${date_object.getHours()}:${date_object.getMinutes()}:${date_object.getSeconds()}` : 
            `${monthNames[date_object.getMonth()]} ${date_object.getDay()}, ${date_object.getFullYear()} (${date_object.getHours()}:${date_object.getMinutes()})`;
    }

    updatePacientData = async e => {
        if(e.key === "Enter")
        {
            const element = e.currentTarget;
            const attrib = element.getAttribute('for-attrib');
            let new_value = element.value;

            if (attrib === "gender")
            {
                if(new_value.toLowerCase() === "hombre")
                {
                    console.log(new_value.toLowerCase())
                    new_value = "0";
                }
                else if(new_value.toLowerCase() === "mujer")
                {
                    new_value = "1";
                }
                else
                {
                    return;
                }
            }
            
            let forma = new FormData();
            forma.append("value_name",attrib);
            forma.append('value_type',attrib!=='age' ? 'string' : 'int');
            forma.append("new_value",new_value);
            forma.append("uuid",this.data.uuid);

            const request = new Request("http://caritasong.000webhostapp.com/php/updatePacientData.php",{method:"POST",body:forma});
            
            let response  = await fetch(request);
            if(response.status === 200)
            {
                this.data[attrib] = new_value;
                this.props.updateSelectedResult(this.data);
                const closingBTN = document.querySelector(`i[closes=${element.parentElement.getAttribute("id")}]`);
                closingBTN.click();
            }    
        }
    }

    setSelectedAppointment = e => {
        const element = e.currentTarget;
        const appoinment = element.getAttribute("created_on");
        this.setState({
            selected_appointment: this.data.appointments[appoinment]
        })
        const appointment_modal = document.getElementById("modal-background");
        appointment_modal.style.display = "block";
    }

    createAppointmentHanlder = () => {
        historial.push('/',{
            action:"add"
        })
    }

    deletePacient = async () => {
        if(window.confirm("seguro que quiere eliminar al paciente?, esta accion no se puede deshacer"))
        {
            const forma = new FormData();
            forma.append("uuid",this.data.uuid);

            const request = new Request("http://caritasong.000webhostapp.com/php/deletePacient.php",{method:'POST',body:forma});

            await fetch(request);
            this.closeSelf(0);
            this.props.resetStore();
        }
    }

    render()
    {
        const { selected_result } = this.props.resultsReducer;
        let appointments_list = [];
        if(selected_result !== null)
        {
            this.data = this.props.resultsReducer.results[selected_result];
            Object.keys(this.data.appointments).forEach(a => {
                appointments_list.push(
                    <div key={a} created_on={a} onClick={this.setSelectedAppointment} className="d-submenu-option submenu-appoinment">
                        <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">{this.getProperAppointmentName(a,true)}</span></h3>
                    </div>
                )
            })
        }
        return(
            <React.Fragment>
                <AppointmentModal data={this.state.selected_appointment} date_name_fnc={this.getProperAppointmentName}/>
                <div id="d-sidebar">
                    <div id="d-sidebar-top-content">
                        <div id="d-menu-title">
                            <h2 id="d-title">{this.data.name}</h2>
                            <i onClick={this.closeSelf} className="fas fa-chevron-circle-right"></i>
                        </div>
                        <div className="d-menu-option" onClick={e => {this.displayBTNClicked(e,"data",".5em 0 .5em")}} closes="datos-submenu" >
                            <h3 className="d-menu-option-text">Datos</h3>
                            <i className="fas fa-caret-left"></i>
                        </div>
                        <div id="datos-submenu" className="d-submenu">
                            <div className="d-submenu-option">
                                <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Nombre: </span>{this.data.name}</h3>
                                <i closes="editor-name" onClick={e => {this.displayBTNClicked(e,"edit_name","1em 0")}} className="fas fa-pen"></i>
                            </div>
                            <div id="editor-name" className="edit-attrib-submenu">
                                <input for-attrib="name" onKeyDown={this.updatePacientData} type="text" placeholder="Nombre" className="edit-attrib-input"/>
                            </div>
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
                                <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Genero: </span>{ parseInt( this.data.gender, 10) === 0 ? "Hombre" : "Mujer" }</h3>
                                <i closes="editor-gender" onClick={e => {this.displayBTNClicked(e,"edit_gender","1em 0")}} className="fas fa-pen"></i>
                            </div>
                            <div id="editor-gender" className="edit-attrib-submenu">
                                <input for-attrib="gender" onKeyDown={this.updatePacientData} type="text" placeholder="Genero" className="edit-attrib-input"/>
                            </div>
                            <div className="d-submenu-option">
                                <h3 className="d-submenu-option-text"><span className="d-submenu-option-label">Primera visita: </span>{this.data.first_seen}</h3>
                            </div>
                        </div>
                        <div onClick={e => {this.displayBTNClicked(e,"data",".5em 0 .5em")}} closes={"consultas-submenu"} className="d-menu-option">
                            <h3 className="d-menu-option-text">Consultas</h3>
                            <i className="fas fa-caret-left"></i>
                        </div>
                        <div id="consultas-submenu" className="d-submenu">
                            {appointments_list}
                        </div>
                    </div>
                    <div id="d-sidebar-controls">
                        <div onClick={this.createAppointmentHanlder} id="new-consulta-btn" className="d-sidebar-controls-btn" >
                            <h4 id="new-consulta-btn-text">Agregar consulta</h4>
                            <i className="fas fa-plus"></i>
                        </div>
                        <div onClick={this.deletePacient} id="delete-pacient-btn" className="d-sidebar-controls-btn" >
                            <h4 id="delete-pacient-btn-text">Borrar paciente</h4>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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