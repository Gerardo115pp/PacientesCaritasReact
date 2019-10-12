import React, { Component } from "react";
import RegisterHeader from "../RegisterHeader";
import StdBtn from "../sntBTN";

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
                        <div className="input-container"><label htmlFor="name-input">Nombre</label><input type="text" id="name-input"/></div>
                        <div className="input-container"><label htmlFor="age-input">Edad</label><input type="text" id="age-input"/></div>
                        <div className="input-container"><label htmlFor="address-input">Domicilio</label><input type="text" id="address-input"/></div>
                        <div className="input-container"><label htmlFor="phone-input">Telefono</label><input type="text" id="phone-input"/></div>
                        <div className="input-container center-input">
                            <label htmlFor="phone-input">Genero</label>
                            <select name='gender-options' id="gender-input">
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
                        <div className="input-container"><label htmlFor="pulse-input">Pulso</label><input type="text" id="pulse-input"/></div>
                        <div className="input-container"><label htmlFor="temp-input">Temperatura</label><input type="text" id="temp-input"/></div>
                        <div className="input-container"><label htmlFor="ta-input">T.A</label><input type="text" id="ta-input"/></div>
                        <div className="input-container"><label htmlFor="fr-input">F.C</label><input type="text" id="fr-input"/></div>
                        <div className="input-container center-input"><label htmlFor="fc-input">F.R</label><input type="text" id="fc-input"/></div>
                        <div id="section-container">
                            <div className="input-container"><label htmlFor="alch-input">Alcholsimo</label><input type="checkbox" id="alch-input"/></div>
                            <div className="input-container"><label htmlFor="taba-input">Tabaquismo</label><input type="checkbox" id="taba-input"/></div>
                            <div className="input-container"><label htmlFor="addic-input">Addiciones</label><input type="checkbox" id="adic-input"/></div>
                        </div>
                    </div>
                </React.Fragment>
            ),
            notas: (
                <React.Fragment>
                    <div id="view-title"><span className="view-title-container">Notas</span></div>
                    <div id="view-container">
                        <div className="input-container"><label htmlFor="iner-input">Interrogatorio</label><textarea type="text" id="iner-input"/></div>
                        <div className="input-container"><label htmlFor="diag-input">Diagnostico</label><textarea type="text" id="diag-input"/></div>
                        <div className="input-container"><label htmlFor="notas-input">Notas de evaluacion</label><textarea type="text" id="notas-input"/></div>
                        <div className="input-container"><label htmlFor="trata-input">Tratamiento y resultados</label><textarea type="text" id="trata-input"/></div>
                        <div className="input-container"><label htmlFor="estudios-input">Estudios de Laboratorio</label><textarea type="text" id="estudios-input"/></div>
                        <div className="input-container"><label htmlFor="antec-input">Antecedentes Heredados Familiares</label><textarea type="text" id="antec-input"/></div>
                        <div className="input-container center-input"><label htmlFor="pade-input">Padecimiento actual e interrogatorio por aparatos y sistemas</label><textarea type="text" id="pade-input"/></div>
                    </div>
                </React.Fragment>
            )
        }
        this.state = {
            views: inputs_displays,
            current: 0
        }
    }

    controlBTNHandler = operation => {
        const { current } = this.state;
        if(operation === "+")
        {
            if ((current+1) <= 3)
            {
                this.setState({
                    current: current+1
                });
            }
        }
        else
        {
            if((current-1) >= 0)
            {
                this.setState({
                    current: current-1
                });
            }
        }
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
                return(
                    <span>On progress</span>
                );
            default:
                return(
                    <span>An error has ocurred, sorry for the inconvinience</span>
                )
        }
    }

    render(){
        const content = this.viewSelector();
        return(
            <React.Fragment>
                <RegisterHeader current={this.state.current}/>
                <div id="inputs-container">
                    {content}
                </div>
                <div id="steps-nav-controls">
                    <StdBtn callback={this.controlBTNHandler} operation='-' text="Atras" color="dim-btn"/>
                    <StdBtn callback={this.controlBTNHandler} operation='+' text="Siguiente"/>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexPage;