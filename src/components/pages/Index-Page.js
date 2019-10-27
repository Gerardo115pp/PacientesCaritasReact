import React, { Component } from "react";
import RegisterHeader from "../RegisterHeader";
import StdBtn from "../sntBTN";
import SideBar from "../SideBar";
import { connect } from 'react-redux';
import * as resultsActions from '../../actions/resultsActions';
import '../../css/IndexPage.css';
import historial from "../historial";

class IndexPage extends Component
{
    constructor()
    {
        super();
        let inputs_displays = {
            personal:(
                <React.Fragment>
                    <div id="view-title"><span className="view-title-container">Datos Personales</span></div>
                    <div id="view-container">
                        <div className="input-container"><label htmlFor="name-input">Nombre</label><input onChange={this.inputDataChanged} name="name" type="text" id="name-input"/></div>
                        <div className="input-container"><label htmlFor="age-input">Edad</label><input onChange={this.inputDataChanged} type="text" name="age" id="age-input"/></div>
                        <div className="input-container"><label htmlFor="address-input">Domicilio</label><input onChange={this.inputDataChanged} type="text" name="address" id="address-input"/></div>
                        <div className="input-container"><label htmlFor="phone-input">Teléfono</label><input onChange={this.inputDataChanged}    type="text" name="phone" id="phone-input"/></div>
                        <div className="input-container center-input">
                            <label htmlFor="phone-input">Género</label>
                            <select onChange={this.inputDataChanged} name='gender' id="gender-input">
                                <option value="0">Hombre</option>
                                <option value="1">Mujer</option>
                            </select>
                        </div>
                    </div>
                </React.Fragment>
            ),
            exploracion: (
                <React.Fragment>
                    <div id="view-title"><span className="view-title-container">Exploracion y antecedentes</span></div>
                    <div id="view-container">
                        <div className="input-container"><label htmlFor="pulse-input">Pulso</label><input onChange={this.inputDataChanged} name="pulse" type="text" id="pulse-input"/></div>
                        <div className="input-container"><label htmlFor="temp-input">Temperatura</label><input onChange={this.inputDataChanged} name="temp" type="text" id="temp-input"/></div>
                        <div className="input-container"><label htmlFor="ta-input">T.A</label><input onChange={this.inputDataChanged} name="t.a" type="text" id="ta-input"/></div>
                        <div className="input-container"><label htmlFor="fr-input">F.C</label><input onChange={this.inputDataChanged} name="f.r" type="text" id="fr-input"/></div>
                        <div className="input-container center-input"><label htmlFor="fc-input">F.R</label><input onChange={this.inputDataChanged} name="f.c" type="text" id="fc-input"/></div>
                        <div id="section-container">
                            <div className="input-container"><label htmlFor="alch-input">Alcholsimo</label><input onChange={this.inputDataChanged} name="alch" type="checkbox" id="alch-input"/></div>
                            <div className="input-container"><label htmlFor="taba-input">Tabaquismo</label><input onChange={this.inputDataChanged} name="taba" type="checkbox" id="taba-input"/></div>
                            <div className="input-container"><label htmlFor="addic-input">Addicciones</label><input onChange={this.inputDataChanged} name="addic" type="checkbox" id="adic-input"/></div>
                        </div>
                    </div>
                </React.Fragment>
            ),
            notas: (
                <React.Fragment>
                    <div id="view-title"><span className="view-title-container">Notas</span></div>
                    <div id="view-container">
                        <div className="input-container"><label htmlFor="iner-input">Interrogatorio</label><textarea onChange={this.inputDataChanged} name="iner" type="text" id="iner-input"/></div>
                        <div className="input-container"><label htmlFor="diag-input">Diagnóstico</label><textarea onChange={this.inputDataChanged} name="diag" type="text" id="diag-input"/></div>
                        <div className="input-container"><label htmlFor="notas-input">Notas de evaluación</label><textarea onChange={this.inputDataChanged} name="notas" type="text" id="notas-input"/></div>
                        <div className="input-container"><label htmlFor="trata-input">Tratamiento y resultados</label><textarea onChange={this.inputDataChanged} name="trata" type="text" id="trata-input"/></div>
                        <div className="input-container"><label htmlFor="estudios-input">Estudios de Laboratorio</label><textarea onChange={this.inputDataChanged} name="estudios" type="text" id="estudios-input"/></div>
                        <div className="input-container"><label htmlFor="antec-input">Antecedentes Heredados Familiares</label><textarea onChange={this.inputDataChanged} name="antec" type="text" id="antec-input"/></div>
                        <div className="input-container center-input"><label htmlFor="pade-input">Padecimiento actual e interrogatorio por aparatos y sistemas</label><textarea onChange={this.inputDataChanged} name="pade" type="text" id="pade-input"/></div>
                    </div>
                </React.Fragment>
            )
        }
        this.user_to_appoint = {}
        this.state = {
            action: 'register',
            views: inputs_displays,
            current: 0,
            finished: false,
            user_data: {
                name:"",
                gender:"0"
            }
        }
    }

    praperAddApointmentAction = () => {
        const { results, selected_result } = this.props.resultsReducer;
        this.user_to_appoint = results[selected_result];
        const user_data = {
            name:this.user_to_appoint.name,
            age:this.user_to_appoint.age,
            gender:this.user_to_appoint.gender,
            phone:this.user_to_appoint.phone,
            address:this.user_to_appoint.address
        }

        return user_data;

    }

    componentDidMount(){
        const { state: historial_params } = this.props.location; 
        if(historial_params)
        {
            if(this.state.action !== historial_params.action)
            {
                switch(historial_params.action)
                {
                    case 'add':
                        if(this.props.resultsReducer.selected_result !== null)
                        {
                            const new_view = this.state.views;
                            const user_data = this.praperAddApointmentAction();
                            const personal_locked = (
                                <React.Fragment>
                                    <div id="view-title"><span className="view-title-container">Datos Personales</span></div>
                                        <div id="view-container">
                                            <div className="input-container"><label htmlFor="name-input">Nombre</label><input onChange={this.inputDataChanged} name="name" type="text" id="name-input" readOnly/></div>
                                            <div className="input-container"><label htmlFor="age-input">Edad</label><input onChange={this.inputDataChanged} type="text" name="age" id="age-input" readOnly/></div>
                                            <div className="input-container"><label htmlFor="address-input">Domicilio</label><input onChange={this.inputDataChanged} type="text" name="address" id="address-input" readOnly/></div>
                                            <div className="input-container"><label htmlFor="phone-input">Teléfono</label><input onChange={this.inputDataChanged}    type="text" name="phone" id="phone-input" readOnly/></div>
                                            <div className="input-container center-input">
                                                <label htmlFor="phone-input">Género</label>
                                                <select onChange={this.inputDataChanged} name='gender' id="gender-input" readOnly>
                                                    <option disabled value="0">Hombre</option>
                                                    <option disabled value="1">Mujer</option>
                                                </select>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                            this.setState({
                                action: historial_params.action,
                                current:1,
                                user_data: user_data,
                                finished: true,
                                views:{
                                    ...new_view,
                                    personal: personal_locked
                                }
                            })
                        }
                        break;
                    default:
                        break
                }
            }
        }

    }

    controlBTNHandler = async operation => {
        const { current } = this.state;
        if(operation === "+")
        {
            if ((current+1) <= 3)
            {
                await this.setState({
                    current: current+1
                });
                this.setFieldsValues();
            }
        }
        else
        {
            if((current-1) >= 0)
            {
                await this.setState({
                    current: current-1
                });
                this.setFieldsValues();
            }
        }
    }

    inputDataChanged = e => {
        const element = e.target,
              field_name = element.getAttribute('name'),
              { user_data } = this.state;
        let { finished } = this.state; 

        user_data[field_name] = (element.getAttribute('type')!=="checkbox") ? element.value : element.checked;
        if (field_name==="name") 
        {   
            if(element.value.length > 0)
            {
                finished = true
            }
            else
            {
                finished = false
            }
        }
        this.setState({
            user_data: user_data,
            finished
        })
    }

    saveData = () => {
        if(this.state.finished && this.state.action === 'register')
        {
            const { user_data } = this.state;
            const stringed_json = JSON.stringify(user_data);
            
            let forma =  new FormData();
            forma.append('json',stringed_json);
            const request = new Request('http://caritasong.000webhostapp.com/php/registerPacient.php',{method: 'POST', body: forma})
            fetch(request)
                .then(promise => {
                    if(promise.ok)
                    {
                        this.resetAll();
                    }
                })
        }
        else if(this.state.finished && this.state.action === 'add')
        {
            const { user_data } = this.state;
            const stringed_json = JSON.stringify(user_data);

            let forma =  new FormData();
            forma.append('user_data',stringed_json);
            forma.append('uuid',this.user_to_appoint.uuid);

            let request = new Request('http://caritasong.000webhostapp.com/php/createPacientAppointment.php',{method:'POST',body:forma});
            fetch(request)
                .then(promise => {
                    if(promise.status === 200)
                    {
                        this.props.resetStore();
                        historial.push('/busqueda');
                    }
                })
        }
        else
        {
            alert("Porfavor agregue cualquier dato en el campo de nombre, es necesario como identificador.");
        }
    }

    gotToTag = key => {
        this.setState({
            current: parseInt(key)
        })
    }

    render(){
        const content = this.viewSelector();
        const need_btn = (this.state.current !== 3) ? (<StdBtn callback={this.controlBTNHandler} operation='+' text="Siguiente"/>) :
                         (<StdBtn callback={this.saveData} operation='+' text="Guardar"/>);
        return(
            <React.Fragment>
                <SideBar/>
                <RegisterHeader callback={this.gotToTag} current={this.state.current}/>
                <div id="inputs-container">
                    {content}
                </div>
                <div id="steps-nav-controls">
                    <StdBtn callback={this.controlBTNHandler} operation='-' text="Atrás" color="dim-btn"/>
                    {need_btn}
                </div>
            </React.Fragment>
        )
    }

    resetAll = async () => {
        await this.setState({
            current: 0,
            finished: false,
            user_data: {
                name:"",
                gender:"0"
            }
        })
        this.setFieldsValues();
    }

    setFieldsValues = () => {
        let inputs = document.querySelectorAll(".input-container input, .input-container select, .input-container textarea");
        const { user_data } = this.state;
        let name;
        
        inputs.forEach(i => {
            name = i.getAttribute('name')
            if(i.getAttribute("type")==="checkbox")
            {
                i.checked = (user_data[name]!==undefined) ? user_data[name] : false;
            }
            else
            {
                i.value = (user_data[name]!==undefined) ? user_data[name] : '';
            }
        })
    }

    viewSelector = () => {
        const {current} = this.state;
        
        switch (current) 
        {
            case 0:
                return this.state.views.personal;
            case 1:
                return this.state.views.exploracion;
            case 2:
                return this.state.views.notas;
            case 3:

                const finish_text = this.state.finished ? "Registro Terminado, Ahora puede guradar el Registro" :
                    "Porfavor agregue cualquier dato en el campo de nombre, es necesario como identificador";
                
                const class_color = this.state.finished ? "blue" : "red";
                const emoji = this.state.finished ? <i className="far fa-smile-beam"></i> : <i className="far fa-meh"></i>; 

                return(
                    <React.Fragment>
                    <div id="view-title"><span className="view-title-container">Terminado</span></div>
                    <div id="view-container">
                        <div id="finish-container">
                            <div id="finish-logo-container" className={class_color}>
                                {emoji}
                            </div>
                            <div id="finish-text-container">
                                <span className="title-text">{finish_text}</span>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                );
            default:
                return(
                    <span>An error has ocurred, sorry for the inconvinience</span>
                )
        }
    }
}

const mapStateToProps = reducers => {
    return {
        resultsReducer: reducers.resultsReducer
    }
}

export default connect(mapStateToProps,resultsActions)(IndexPage);