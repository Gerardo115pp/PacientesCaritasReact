import React from 'react';
import '../css/printableAppointment.css';


function appointmentPrintable(props)
{
    const { data } = props;
    const timeGetter = () => {const d = new Date(); return `${d.getDate()}\\${d.getMonth()+1}\\${d.getFullYear()}`};

    return(
        <div id="printable-container">
            <div id="printable-header">
                <div id="printable-header-datos">
                    <h3 id="printable-header-title">CARITAS DE GUADALAJARA, A.C.</h3>
                    <div className="printable-dato">
                        <label htmlFor="input-dspensario">DISPENSARIO</label>
                        <input id="input-dspensario" type="text"  readOnly/>
                    </div>
                    <div className="printable-dato">
                        <label htmlFor="input-pname">NOMBRE DEL PACIENTE</label>
                        <input id="input-pname" type="text" value={data["name"]}  readOnly/>
                    </div>
                </div>
                <div id="printable-header-statics">
                    <div className="printable-header-static">
                        <h4>FECHA</h4>
                        <span>{timeGetter()}</span>
                    </div>
                </div>
            </div>
            <p>{(data["presc"] !== undefined) ? data["presc"] : "No hay prescipcion" }</p>
            <div id="printable-footer">
                <div id="caritas-data">
                    <h3>HORARIOS CONSULTA</h3>
                    <p>LUNES A VIERNES DE 8:00 - 14:00</p>
                    <p>SABADOS DE 8:00 - 13:00</p>
                    <p>BELISARIO DOMINGUEZ #511, COL. SAN JUAN DE DIOS</p>
                    <p>TELS. 3617-6555 3617-6122</p>
                </div>
                <div id="dr-data">
                    <h3>DRA. ISELA MARÌA CORTÈS ZERMEÑO</h3>
                    <p>MEDICO-CIRUJANO-PARTERO</p>
                    <p>UNIVERSIDAD AUTONOMA DE MEXICO</p>
                    <p className="seudo-input">MEDICO</p>
                    <p>D.G.P. 1436094</p>
                </div>
            </div>

        </div>
    )
}

export default appointmentPrintable;