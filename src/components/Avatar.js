import React from 'react'

const Avatar = ({image,name}) => {
    return (
        <div className="avatar">
            <img src={image} alt="Profile" className="profile-picture"/>
            <span>{name}</span>
        </div>
    )
}

export default Avatar
