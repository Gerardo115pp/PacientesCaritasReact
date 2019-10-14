import React, { Component } from 'react';
import StdHeader from '../stdHeader';
import SearchBar from '../SearchBar';
import '../../css/SearchingPage.css'

class SearchingPage extends Component
{
    render(){
        return(
            <React.Fragment>
                <StdHeader />
                <div id="view-title"><span className="view-title-container">Buscar Pacientes</span></div>
                <div id="page-container">
                    <div className="padded-searchbar-container">
                        <SearchBar />
                    </div>
                    <div id="results-container">
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SearchingPage;