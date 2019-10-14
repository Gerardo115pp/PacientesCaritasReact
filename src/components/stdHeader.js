import React from 'react';
import ModanavBTN from './ModalNavBTN';
import SideBar from './SideBar';
import '../css/RegisterHeader.css';

export default function stdHeader(props){
    return(
        <React.Fragment>
            <SideBar />
            <header id="register-header">
                <ModanavBTN />
            </header>
        </React.Fragment>
    )
}