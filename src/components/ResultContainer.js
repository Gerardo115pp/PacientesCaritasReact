import React, { Component } from 'react';

class ResultContainer extends Component
{
    render(){
        const { name } = this.props.data;
        return(
            <div className="result-container">
                <span className="result-text">
                    {name}
                </span>
            </div>
        )
    }
}

export default ResultContainer;