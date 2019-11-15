import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';
import '../css/SearchBar.css';

class SearchBar extends Component
{

    state = {
        content:  ""
    }

    writeingOnSearchBarHandler = e => {
        const search_bar_input = document.getElementById('search-bar-input');
        this.setState({
            content: search_bar_input.value
        })
    }

    sendSearch = () => {
        const { content } = this.state;
        let forma = new FormData();
        forma.append('name_array',JSON.stringify(content));

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
                <div id="search-bar-container">
                    <input onKeyDown={this.enterPressListener} onChange={ this.writeingOnSearchBarHandler } placeholder="Nombre del paciente.." type="text" id="search-bar-input"/>
                    <div id="search-bar-controls">
                        <span onClick={ this.sendSearch } name='search-btn' className="seatch-bar-btn"><i className="fas fa-search"></i></span>
                        <span name='settings-btn' className="seatch-bar-btn"><i className="fas fa-tasks"></i></span>
                    </div>
                </div>
                <div id="advance-search-container">
                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = reducers => {
    return {
        results: reducers.resultsReducer
    }
}

export default connect(mapStateToProps,resultsActions)(SearchBar);