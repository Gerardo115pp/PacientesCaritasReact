import React, { Component } from 'react';
import '../css/SearchBar.css';

class SearchBar extends Component
{
    render(){
        return(
            <div id="search-bar-container">
                <input placeholder="Nombre del paciente.." type="text" id="search-bar-input"/>
                <div id="search-bar-controls">
                    <span name='search-btn' className="seatch-bar-btn"><i className="fas fa-search"></i></span>
                    <span name='settings-btn' className="seatch-bar-btn"><i className="fas fa-tasks"></i></span>
                </div>
            </div>
        )
    }
}

export default SearchBar;