import React from 'react';

export default function(props)
{
    const { text, operation } = props;
    const color = (props.color) ? props.color : 'blue';

    return(
        <div onClick={() => props.callback(operation)}  className={"std-btn "+color}>
            <span className="std-btn-text">{text}</span>
        </div>
    )
}