import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

class AppointmentModal extends Component
{   
    constructor()
    {
        super();
        this.state = {
            data: {}
        }
    }

    closeSelf = e => {
        const element = e.target;
        const element_id = element.getAttribute('id');
        if(element_id==="appointment-close-BTN"||element_id==="modal-background")
        {
            const appointment_modal = document.getElementById("modal-background");
            appointment_modal.style.display = "none";
        }
    }

    setPropsDataAsState = () => {
        const { data: old_data} = this.state;
        const { data: new_data} = this.props;
        if(new_data.created_on!==undefined)
        {
            if((old_data.created_on===undefined)||(old_data.created_on!==new_data.created_on))
            {
                this.setState({
                    data: new_data
                })
            }
        }
        return new_data;
    }

    makePdf = () => {
        const element = document.getElementById('consulta-modal');
        html2canvas(element)
            .then(canvas => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                pdf.addImage(imgData,'PNG',0,0,210,297);
                pdf.save("receta.pdf");
            });
    }

    render()
    {
        const data= this.setPropsDataAsState();
        let title = data.created_on!==undefined ? data.created_on : "unkown";
        return(
            <div onClick={this.closeSelf} id="modal-background">
                <div id="consulta-modal">
                    <div id="consulta-title-container">
                        <h2 id="consulta-title">{this.props.date_name_fnc(title)}</h2>
                        <i id="appointment-close-BTN" onClick={this.closeSelf} className="fas fa-times"></i>
                    </div>
                    <div id="consulta-modal-content">
                        <div id="appointment-info">
                            <div className="appointment-info-section">
                                <div className="appointment-info-attrib">
                                    <h5>Pulso: <span>{data.pulse}</span></h5>
                                </div>
                                <div className="appointment-info-attrib">
                                    <h5>Temperatura: <span>{data.temp}</span></h5>
                                </div>
                                <div className="appointment-info-attrib">
                                    <h5>T.A: <span>{data["t.a"]}</span></h5>
                                </div>
                                <div className="appointment-info-attrib">
                                    <h5>F.C: <span>{data["f.c"]}</span></h5>
                                </div>
                            </div>
                            <div className="appointment-info-section">
                                <div className="appointment-info-attrib">
                                    <h5>F.R: <span>{data["f.r"]}</span></h5>
                                </div>
                                <div className="appointment-info-attrib">
                                    <h5>Alcholsimo: <span>{data["alch"]===true ? "si" : "no" }</span></h5>
                                </div>
                                <div className="appointment-info-attrib">
                                    <h5>Tabaquismo: <span>{data["taba"]===true ? "si" : "no"}</span></h5>
                                </div>
                                <div className="appointment-info-attrib">
                                    <h5>Addicciones: <span>{data["addic"]===true ? "si" : "no"}</span></h5>
                                </div>
                            </div>
                        </div>
                        <div id="appointment-notes">
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Interrogatorio</h3>
                                <textarea cols="30" rows="10" value={data["iner"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Diagnóstico</h3>
                                <textarea cols="30" rows="10" value={data["diag"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Notas de evaluación</h3>
                                <textarea cols="30" rows="10" value={data["notas"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Tratamiento y resultados</h3>
                                <textarea cols="30" rows="10" value={data["trata"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Estudios de Laboratorio</h3>
                                <textarea cols="30" rows="10" value={data["estudios"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Antecedentes Heredados Familiares</h3>
                                <textarea cols="30" rows="10" value={data["antec"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Padecimiento actual e interrogatorio por aparatos y sistemas</h3>
                                <textarea cols="30" rows="10" value={data["pade"]} className="appointment-note" readOnly></textarea>
                            </div>
                            <div className="appointment-note-container">
                                <h3 className="appointment-note-label">Prescripcion</h3>
                                <textarea cols="30" rows="10" value={(data["presc"] !== undefined) ? data["presc"] : "No hay prescipcion" } className="appointment-note" readOnly></textarea>
                            </div>
                        </div>
                    </div>
                    <div id="consulta-modal-controls">
                        <div className="std-btn blue">
                            <span onClick={this.makePdf} className="std-btn-text">Descargar Receta</span>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

export default AppointmentModal;