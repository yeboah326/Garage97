import React from 'react'
import SvgClose from '../../Assets/icons/Close'

const DeleteButton = ({id,onClick}) => {
    return (
            <span className='delete-button' id={id} onClick={onClick}><SvgClose id={id} /></span>
        
    )
}

export default DeleteButton
