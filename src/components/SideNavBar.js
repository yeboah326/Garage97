import React from 'react'
import Avatar from './Avatar'
import Options from './Options'


const SideNavBar = () => {
    return (
        <div className="side-nav-bar">
            <Avatar name="Joseph Barnes" image=""/>
            <Options icon="src/Images/icons/iconmonstr-home-6.svg" alt="icon" optionName="Home"/>
            <Options icon="src/Images/icons/iconmonstr-archive-box-thin.svg" alt="icon" optionName="Businesses"/>
        </div>
    )
}

export default SideNavBar
