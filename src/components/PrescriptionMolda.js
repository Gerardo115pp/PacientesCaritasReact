import React , { Component } from 'react';
import '../css/PrescriptionMolda.css';

class PrescriptionModal extends Component
{

    createPresc = () =>
    {
        const { callback } = this.props;
        const element = document.getElementById('presc-text'),
                modal = document.getElementById('presc-modal-background');
        modal.style.display = 'none';
        callback(element.value);
    }

    render(){
        const { callback } = this.props;
        return(
            <div id="presc-modal-background">
                <div id="presc-modal">
                    <div id="presc-title-container">
                        <h2 id="presc-title-text">¿Desea crear receta?</h2>
                    </div>
                    <div id="presc-txa-label-container">
                        <label htmlFor="presc-text-container">escriba la prescripcion</label>
                    </div>
                    <div id="presc-content">
                        <div id="presc-text-container">
                            <textarea name="" id="presc-text" cols="30" rows="15"></textarea>
                        </div>
                    </div>
                    <div id="presc-controls">
                        <div className="presc-controls-options dimed-option">
                            <h5 onClick={() => {
                                const modal = document.getElementById('presc-modal-background');
                                modal.style.display = 'none';
                                callback(null);
                            }} className="presc-option-text">omitir</h5>
                        </div>
                        <div onClick={this.createPresc} className="presc-controls-options">
                            <h5 className="presc-option-text">Crear</h5>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default PrescriptionModal;