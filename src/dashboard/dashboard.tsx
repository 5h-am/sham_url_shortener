import { Outlet } from 'react-router-dom'
import { MobileNav, MobileNavOptions } from './mobileNav'
import { useState, useEffect } from 'react'
import { DesktopNav } from './desktopNav'

export const DashboardNav = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [large, setLarge] = useState(window.innerWidth > 800)

    useEffect(() => {
        const handleResize = () => {
            setLarge(window.innerWidth > 800)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }
    return (
        <>
            <div className="dashboard-nav">
                {large ?
                <div className="dashboard-desktop-nav flex">
                    <DesktopNav/>
                    <Outlet/>
                </div> :
                <div className="dashboard-mobile-nav flex flex-col">
                    <MobileNav showMenu={showMenu} handleShowMenu={handleShowMenu} />
                    {showMenu ? <MobileNavOptions/> : <Outlet/>}
                </div>
                }        
            </div>          
        </>
    )
}


