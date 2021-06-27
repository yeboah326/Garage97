import React from 'react'

const Business = ({name,description}) => {
    return (
        <div className="business">
            <span>{name}</span>
            <p>{description}</p>
        </div>
    )
}

export default Business
