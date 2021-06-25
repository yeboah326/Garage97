import React from 'react'

const Options = ({optionName,icon,alt}) => {
    return (
        <div className="options">
            <img src={icon} alt={alt}/><span>{optionName}</span>
        </div>
    )
}

export default Options
