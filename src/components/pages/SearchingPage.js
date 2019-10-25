import React, { Component } from 'react';
import { connect } from 'react-redux'
import StdHeader from '../stdHeader';
import SearchBar from '../SearchBar';
import ResultContainer from '../ResultContainer';
import DetailsSidebar from '../DetailsSidebar';
import * as resultsActions from '../../actions/resultsActions';
import '../../css/SearchingPage.css'

class SearchingPage extends Component
{
    render(){
        const { results } = this.props.resultsReducer;
        let search_results = [];
        if(results.length)
        {
            let h = 0;
            results.forEach(r => {
                search_results.push(<ResultContainer key={h} key_value={h++} data={r}/>)
            })
        }
        return(
            <React.Fragment>
                <DetailsSidebar />
                <StdHeader />
                <div id="view-title"><span className="view-title-container">Buscar Pacientes</span></div>
                <div id="page-container">
                    <div className="padded-searchbar-container">
                        <SearchBar />
                    </div>
                    <div id="results-container">
                        {search_results}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = reducers => {
    return {
        resultsReducer: reducers.resultsReducer
    }
}

export default connect(mapStateToProps,resultsActions)(SearchingPage);