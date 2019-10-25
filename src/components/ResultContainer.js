import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as resultsActions from '../actions/resultsActions';

class ResultContainer extends Component
{
    onClickHandler = () => {
        const { key_value, setSelected } = this.props;
        const dsidebar = document.getElementById("d-sidebar");
        setSelected(key_value);
        dsidebar.style.width = "30%";
    }

    render(){
        const { name } = this.props.data;
        return(
            <div className="result-card">
                <div className="result-card-inner">
                    <div className="result-container">
                        <span className="result-text">
                            {name}
                        </span>
                    </div>
                    <div onClick={this.onClickHandler} className="back-side">
                        <div className="back-side-content">
                            <h4 className="back-side-text">Detalles</h4>
                            <i className="fas fa-angle-double-right"></i>
                        </div>    
                    </div>  
                </div>
            </div>
        )
    }
}

const mapStateToProps = reducers => {
    return{
        resultsReducers: reducers.resultsReducer
    }
}

export default connect(mapStateToProps,resultsActions)(ResultContainer);