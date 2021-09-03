import React from 'react'
import SideNavBar from '../ProductDashboard/SideNavBar'
import SideNavBar2 from '../ProductDashboard/SideNavBar2'
import {useState} from 'react'
import SvgMenu from '../../Assets/icons/Menu'
import ReportList from './ReportList'

const Reports = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [navwidth,setWidth] = useState(false)
    let width = navwidth ? '220px' : '100px'
    const [showfullsidenavbar,setShowFullSideNavBar] = useState(false)

    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onHover = () => {
        setShowFullSideNavBar(!showfullsidenavbar)
        setWidth(!navwidth)
    }

    return (
        <div className='reports'>
            {showsidenavbar ?
            <div className='side-nav-page'>
                <SideNavBar onClick={onClickClose}/>
            </div> :
            null
            }
            <div className='reports-container'>
                <header>
                    <div className='menu' onClick={onClickMenu}><SvgMenu fill='#6842ff'/></div>
                </header>
                <div className='desktop-side-nav-bar'style={{width:width}}>
                {!showfullsidenavbar? <SideNavBar2 onHover={onHover} navwidth='100px'/> : <SideNavBar onHover={onHover} navwidth='220px'/>}
                </div>
                <ReportList/>
            </div>
            

        </div>
    )
}

export default Reports

