import React from 'react'
import DeleteButton from './DeleteButton'

const Business = ({name,description}) => {
    return (
        <div className="business">
            <span>{name} <DeleteButton/></span>
            <p>{description}</p>
        </div>
    )
}

export default Business
