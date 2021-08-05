import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import SvgX from '../../Assets/icons/X'
import SvgLogOut from '../../Assets/icons/LogOut'
import { NavLink } from 'react-router-dom'
import {logout} from '../../auth/index'




const SideNavBar2 = ({onHover,navwidth}) => {
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
        <div className="side-nav-bar2" onMouseOver={onHover} style={{width:{navwidth}}}>
            <Avatar name="" image=""/>
            <div className='logout'><NavLink to='' onClick={()=>logout()} className='logout-link'><SvgLogOut stroke='#c0c0c0' fill='#c0c0c0'/></NavLink></div>
        </div>
    )
}

export default SideNavBar2
