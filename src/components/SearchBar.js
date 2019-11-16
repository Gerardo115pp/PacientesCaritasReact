import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';
import '../css/SearchBar.css';

class SearchBar extends Component
{
    constructor()
    {
        super();
        this.filters = {
            age: "*",
            gender: "*"
        }
        this.state = {
            content:  "",
            showing_settings: false
        }
    }

    filterChangeHandler = e => {
        const element = e.target;
        const attrib = element.getAttribute('attrib');
        if(attrib === "age")
        {
            this.filters["age"] = /^\d+$/.test(element.value) ? element.value : "*";
        }
        else
        {
            this.filters[attrib] = element.value;
        }

    }

    getFilters = () => {
        let filters_array = {}
        Object.keys(this.filters).forEach(fk => {
            if(this.filters[fk] !== "*")
            {
                filters_array[fk] = this.filters[fk]
            }
        })
        return filters_array;
    }

    settingsDisplayHandler = () =>
    {
        const { showing_settings } = this.state;
        
        const element = document.querySelector('.dropmenu-container');
        if(showing_settings)
        {
            element.style.display = 'none';
        }
        else
        {
            element.style.display = 'block';
        }
        this.setState({
            showing_settings: !showing_settings
        })
    }


    sendSearch = () => {
        if(this.state.showing_settings)
        {
            this.settingsDisplayHandler();
        }

        let filters_array = this.getFilters();
        const { content } = this.state;
        let forma = new FormData();
        forma.append('name_array',JSON.stringify(content));
        if(Object.keys(filters_array).length > 0)
        {
            forma.append('is_advanced',1);
            forma.append('filters',JSON.stringify(filters_array));
        }

        const request =  new Request("http://caritasong.000webhostapp.com/php/searchEngine.php", { method: 'POST', body: forma});
        fetch(request)
            .then(promise => promise.json())
            .then(response => {
                this.props.setResults(response);
            })

    }

    enterPressListener = e => {
        if(e.key === "Enter")
        {
            this.sendSearch();
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="padded-searchbar-container">
                    <div id="search-bar-container">
                        <input onKeyDown={this.enterPressListener} onChange={ this.writeingOnSearchBarHandler } placeholder="Nombre del paciente.." type="text" id="search-bar-input"/>
                        <div id="search-bar-controls">
                            <span onClick={ this.sendSearch } name='search-btn' className="seatch-bar-btn"><i className="fas fa-search"></i></span>
                            <span name='settings-btn' onClick={this.settingsDisplayHandler} className="seatch-bar-btn"><i className="fas fa-tasks"></i></span>
                        </div>
                    </div>
                </div>
                <div className="dropmenu-container">
                    <div id="advanced-search-container">
                        <h3 id="advanced-search-title">Busqueda selectiva</h3>
                        <div id="advanced-search-filters">
                            <div className="advanced-search-filter">
                                <label htmlFor="age-filter">Edad</label>
                                <input onChange={this.filterChangeHandler} id="age-filter" attrib="age" type="text"/>
                            </div>
                            <div className="advanced-search-filter">
                                <label htmlFor="gender-filter">Genero</label>
                                <select onChange={this.filterChangeHandler} attrib="gender" id="gender-filter">
                                    <option value="*">Cualquiera</option>
                                    <option value="0">Hombre</option>
                                    <option value="1">Mujer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    writeingOnSearchBarHandler = e => {
        const search_bar_input = document.getElementById('search-bar-input');
        this.setState({
            content: search_bar_input.value
        })
    }
}

const mapStateToProps = reducers => {
    return {
        results: reducers.resultsReducer
    }
}

export default connect(mapStateToProps,resultsActions)(SearchBar);