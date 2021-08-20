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


const SideNavBar2 = ({onHover,navwidth}) => {
    return (
        <div className="side-nav-bar2" onMouseOver={onHover} style={{width:navwidth}}>
            <Avatar name="" image="" business=''/>
            <div className='option main'><NavLink to='business/overview' className='options-link-1' activeClassName='active'><SvgHome fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink to='/businesses' className='options-link-1' activeClassName='active'><SvgBriefcase fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink to='/business/products' className='options-link-1' activeClassName='active'><SvgBoxThin fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink to='/business/stocks' className='options-link-1' activeClassName='active'><SvgDelivery fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink to='/business/sales' className='options-link-1' activeClassName='active'><SvgTag fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink to='/business/customers' className='options-link-1' activeClassName='active'><SvgUser fill='#c0c0c0'/></NavLink></div>
            <div className='option main'><NavLink to='/business/report' className='options-link-1' activeClassName='active'><SvgReport fill='#c0c0c0'/></NavLink></div>
            <div className='logout main'><NavLink to=''  className='options-link-1'><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/></NavLink></div>
        </div>
    )
}

export default SideNavBar2
