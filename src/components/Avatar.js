import React from 'react'



const Avatar = ({image,name,business}) => {
    return (
        <div className="avatar">
            <img src={image} alt="" className="profile-picture" />
            <span>{name}</span>
            <span className='business-name'>{business}</span>
        </div>
    )

}

Avatar.defaultProps = {
    image: "../Assets/Images/default_user.png",
}

export default Avatar
