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


const SideNavBar = ({onClick,onHover,navwidth}) => {
    const [user,setUser] = useState({})
    const user_id = localStorage.getItem('User')
    const fetchUser = async ()=> {
        const response = await fetch(`http://localhost:9000/users/${user_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const res = await response.json()
        setUser(res)
    }
    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <div className="side-nav-bar" onMouseOut={onHover} style={{width:{navwidth}}}>
            <div className='close-side-nav-bar' onClick={onClick}><button>x</button></div>
            <Avatar name={user.name} image="" business='Kako Inc'/>
            <div className='option main'><NavLink exact to='/overview' className='options-link-1' activeClassName='active'><SvgHome fill='#c0c0c0'/><Options optionName="Home"/></NavLink></div>
            <div className='option main'><NavLink exact to='/businesses' className='options-link-1' activeClassName='active'><SvgBriefcase fill='#c0c0c0'/><Options optionName="Businesses"/></NavLink></div>
            <div className='option main'><NavLink exact to='/products' className='options-link-1' activeClassName='active'><SvgBoxThin fill='#c0c0c0'/><Options optionName="Products"/></NavLink></div>
            <div className='option main'><NavLink exact to='/stocks1' className='options-link-1' activeClassName='active'><SvgDelivery fill='#c0c0c0'/><Options optionName="Stock"/></NavLink></div>
            <div className='option main'><NavLink exact to='/Sales' className='options-link-1' activeClassName='active'><SvgTag fill='#c0c0c0'/><Options optionName="Sales"/></NavLink></div>
            <div className='option main'><NavLink exact to='/businesses' className='options-link-1' activeClassName='active'><SvgUser fill='#c0c0c0'/><Options optionName="Customers"/></NavLink></div>
            <div className='option main'><NavLink exact to='/businesses' className='options-link-1' activeClassName='active'><SvgReport fill='#c0c0c0'/><Options optionName="Report"/></NavLink></div>
            <div className='logout' onClick={()=>{logout()}}><NavLink to='' className='logout-link options-link-1'><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/>Logout</NavLink></div>
        </div>
    )
}

export default SideNavBar
