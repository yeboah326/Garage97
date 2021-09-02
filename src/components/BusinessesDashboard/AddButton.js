import React from 'react'

const AddButton = ({toggle}) => {
    return (
        <div className="add-button" onClick={toggle}>
            <button>+</button>
        </div>
    )
}

export default AddButton
