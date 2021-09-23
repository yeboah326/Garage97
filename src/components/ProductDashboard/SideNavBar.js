import React,{useState,useEffect} from 'react'
import Avatar from '../Avatar'
import Options from '../Options'
import { NavLink } from 'react-router-dom'
import SvgHome from '../../Assets/icons/Home'
import SvgTag from '../../Assets/icons/Tag'
import SvgUser from '../../Assets/icons/User'
import SvgDelivery from '../../Assets/icons/Delivery'
import SvgBoxThin from '../../Assets/icons/BoxThin'
import SvgLogOut from '../../Assets/icons/LogOut'
import SvgBriefcase from '../../Assets/icons/Briefcase'
import SvgReport from '../../Assets/icons/Report'
import { logout } from '../../auth'
import SecureStorage from '../../auth/secure'


const SideNavBar = ({onClick,onHover,navwidth}) => {
    const user = SecureStorage.get('User').name.split(" ")
    const business_name = SecureStorage.get('business_name')
    return (
        <div className="side-nav-bar" onMouseOut={onHover} style={{width:{navwidth}}}>
            <div className='close-side-nav-bar' onClick={onClick}><button>x</button></div>
            <Avatar name={`${user[0]} ${user.slice(-1)}`} image="" business={business_name}/>
            <div className='option main'><NavLink  to='/business/overview' className='options-link-1' activeClassName='active'><SvgHome fill='#c0c0c0'/><Options optionName="Dashboard"/></NavLink></div>
            <div className='option main'><NavLink  to='/businesses' className='options-link-1' activeClassName='active'><SvgBriefcase fill='#c0c0c0'/><Options optionName="Businesses"/></NavLink></div>
            <div className='option main'><NavLink  to='/business/products' className='options-link-1' activeClassName='active'><SvgBoxThin fill='#c0c0c0'/><Options optionName="Products"/></NavLink></div>
            <div className='option main'><NavLink  to='/business/stocks' className='options-link-1' activeClassName='active'><SvgDelivery fill='#c0c0c0'/><Options optionName="Stock"/></NavLink></div>
            <div className='option main'><NavLink  to='/business/sales' className='options-link-1' activeClassName='active'><SvgTag fill='#c0c0c0'/><Options optionName="Sales"/></NavLink></div>
            <div className='option main'><NavLink  to='/business/customers' className='options-link-1' activeClassName='active'><SvgUser fill='#c0c0c0'/><Options optionName="Customers"/></NavLink></div>
            <div className='option main'><NavLink  to='/business/report' className='options-link-1' activeClassName='active'><SvgReport fill='#c0c0c0'/><Options optionName="Report"/></NavLink></div>
            <div className='logout' onClick={()=>{logout()}}><NavLink to='' className='logout-link options-link-1'><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/>Logout</NavLink></div>
        </div>
    )
}

export default SideNavBar
