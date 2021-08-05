import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import SvgLogOut from '../../Assets/icons/LogOut'
import { NavLink } from 'react-router-dom'
import {logout} from '../../auth/index'



const SideNavBar = ({onClick,navwidth,onHover}) => {
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
        <div className="side-nav-bar" style={{width:{navwidth}}} onMouseOut={onHover}>
            <div className='close-side-nav-bar' onClick={onClick}><button>x</button></div>
            <Avatar name= {user.name} image=""/>
            <div className='logout'><NavLink to='' onClick={()=>logout()} className='logout-link'><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/>Logout</NavLink></div>
        </div>
    )
}

export default SideNavBar
