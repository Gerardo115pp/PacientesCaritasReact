import React, { Component } from "react";
import ModanavBTN from "./ModalNavBTN";
import '../css/RegisterHeader.css'

class RegisterHeader extends Component
{

    clickHandler = e => {
        const { callback } = this.props;
        const element = e.currentTarget;
        const key = element.getAttribute('llave');
        callback(key);
    }

    render(){
        const { current } = this.props;
        const sections = ["Datos Personales", "Exploracion y antecedentes", "Notas", "Terminado"];
        const steps = []
        for(let h = 0; h <=3; h++)
        {
            if ( h !== current )
            {
                steps.push(
                    (<div key={h} llave={h} onClick={this.clickHandler} className="step-container"><span className="step-text">{sections[h]}</span></div>)
                )
            }
            else
            {
                steps.push(
                    (<div key={h} llave={h} onClick={this.clickHandler} className="step-container current-step"><span className="step-text">{sections[h]}</span></div>)
                )
            }
        } 
        return(
            <header id="register-header">
                <ModanavBTN />
                <div id="register-steps-container">
                    {steps}
                </div>
            </header>
        )
    }
}

export default RegisterHeader;