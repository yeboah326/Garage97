import React from 'react'
import Avatar from '../Avatar'
import { NavLink } from 'react-router-dom'
import SvgHome from '../../Assets/icons/Home'
import SvgTag from '../../Assets/icons/Tag'
import SvgUser from '../../Assets/icons/User'
import SvgDelivery from '../../Assets/icons/Delivery'
import SvgBoxThin from '../../Assets/icons/BoxThin'
import SvgLogOut from '../../Assets/icons/LogOut'
import SvgBriefcase from '../../Assets/icons/Briefcase'
import SvgReport from '../../Assets/icons/Report'


const SideNavBar2 = ({onHover}) => {
    return (
        <div className="side-nav-bar2" onMouseOver={onHover} onMouseOut={onHover}>
            <Avatar name="" image="" business='Kako Inc'/>
            <div className='option main'><NavLink exact to='/overview' className='options-link-1' activeClassName='active'><SvgHome fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink exact to='/businesses' className='options-link-1' activeClassName='active'><SvgBriefcase fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink exact to='/products' className='options-link-1' activeClassName='active'><SvgBoxThin fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink exact to='/stocks1' className='options-link-1' activeClassName='active'><SvgDelivery fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink exact to='/Sales' className='options-link-1' activeClassName='active'><SvgTag fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink exact to='/businesses' className='options-link-1' activeClassName='active'><SvgUser fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink exact to='/businesses' className='options-link-1' activeClassName='active'><SvgReport fill='#c0c0c0'/></NavLink></div>
            <div className='logout'><NavLink to=''><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/></NavLink></div>
        </div>
    )
}

export default SideNavBar2
