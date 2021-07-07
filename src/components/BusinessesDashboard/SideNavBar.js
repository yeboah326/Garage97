import React from 'react'
import Avatar from '../Avatar'
import Options from '../Options'
import SvgHome from '../../Assets/icons/Home'
import SvgBoxThin from '../../Assets/icons/BoxThin'
import { Link } from 'react-router-dom'
import {useState} from 'react'


const SideNavBar = () => {
    const [active,setActive] = useState({'home':'false','businesses':'false'})
    const onHomeClick = () => {
        setActive({'home':'true','businesses':'false'})
    }
    const onBusinessesClick = () => {
        setActive({'home':'false','businesses':'true'})
    }
    return (
        <div className="side-nav-bar">
            <Avatar name="Joseph Barnes" image=""/>
            <div className='option'><Link to='/dashboard-home' className='options-link-1' onClick={onHomeClick}><SvgHome fill={active['home']?'#7e39fe':'#c0c0c0'}/><Options optionName="Home"/></Link></div>
            <div className='option'><Link to='/dashboard-businesses' className='options-link-1' onClick={onBusinessesClick}><SvgBoxThin stroke={active['businesses']?'#7e39fe':'#c0c0c0'}/><Options optionName="Businesses"/></Link></div>
        </div>
    )
}

export default SideNavBar
