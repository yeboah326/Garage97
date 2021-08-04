import React from 'react'
import SvgTrashCan from '../../Assets/icons/TrashCan'

const DeleteButton = ({onClick}) => {
    return (
            <span className='delete-button' onClick={onClick}><SvgTrashCan /></span>
        
    )
}

export default DeleteButton
