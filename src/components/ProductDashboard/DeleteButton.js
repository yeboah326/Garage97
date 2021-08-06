import React from 'react'
import SvgClose from '../../Assets/icons/Close'

const DeleteButton = ({onClick,id}) => {
    return (
            <span className='delete-button' onClick={onClick} id={id}><SvgClose id={id}/></span>
        
    )
}

export default DeleteButton
