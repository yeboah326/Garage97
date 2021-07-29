import React from 'react'
import Avatar from '../Avatar'
import Options from '../Options'
import { NavLink } from 'react-router-dom'
import SvgHome from '../../Assets/icons/Home'
import SvgTag from '../../Assets/icons/Tag'
import SvgUser from '../../Assets/icons/User'
import SvgDelivery from '../../Assets/icons/Delivery'
import SvgBoxThin from '../../Assets/icons/BoxThin'
import SvgLogOut from '../../Assets/icons/LogOut'


const SideNavBar = () => {
    return (
        <div className="side-nav-bar">
            <Avatar name="Joseph Barnes" image="" business='Kako Inc'/>
            <div className='option main'><NavLink exact to='/home' className='options-link-1' activeClassName='active'><SvgHome fill='#c0c0c0'/><Options optionName="Home"/></NavLink></div>
            <div className='option main'><NavLink exact to='/overview' className='options-link-1' activeClassName='active'><SvgUser fill='#c0c0c0'/><Options optionName="Overview"/></NavLink></div>
            <div className='option main'><NavLink exact to='/products' className='options-link-1' activeClassName='active'><SvgBoxThin fill='#c0c0c0'/><Options optionName="Products"/></NavLink></div>
            <div className='option main'><NavLink exact to='/stocks' className='options-link-1' activeClassName='active'><SvgDelivery fill='#c0c0c0'/><Options optionName="Stock"/></NavLink></div>
            <div className='option main'><NavLink exact to='/sales' className='options-link-1' activeClassName='active'><SvgTag fill='#c0c0c0'/><Options optionName="Sales"/></NavLink></div>
            <div className='option main'><NavLink exact to='/dashboard-home' className='options-link-1' activeClassName='active'><SvgUser fill='#c0c0c0'/><Options optionName="Customers"/></NavLink></div>
            <div className='logout'><NavLink to=''><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/></NavLink></div>
        </div>
    )
}

export default SideNavBar
