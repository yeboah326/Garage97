import React from 'react'
import Avatar from '../Avatar'
import Options from '../Options'
import SvgHome from '../../Assets/icons/Home'
import SvgBoxThin from '../../Assets/icons/BoxThin'
import SvgLogOut from '../../Assets/icons/LogOut'
import { NavLink } from 'react-router-dom'
import {logout} from '../../auth/index'



const SideNavBar = () => {
  
    return (
        <div className="side-nav-bar">
            <Avatar name="Joseph Barnes" image=""/>
            <div className='option'><NavLink exact to='/dashboard-home' className='options-link-1' activeClassName='active'><SvgHome fill='#c0c0c0'/><Options optionName="Home"/></NavLink></div>
            <div className='option'><NavLink exact to='/dashboard-businesses' className='options-link-1' activeClassName='active'><SvgBoxThin stroke="#c0c0c0" fill="#c0c0c0"/><Options optionName="Businesses"/></NavLink></div>
            <div className='logout'><NavLink to='' onClick={()=>logout()}><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/></NavLink></div>
        </div>
    )
}

export default SideNavBar
