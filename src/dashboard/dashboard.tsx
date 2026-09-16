import { Outlet, useNavigate } from 'react-router-dom'
import { MobileNav, MobileNavOptions } from './mobileNav'
import { useState, useEffect } from 'react'
import { DesktopNav } from './desktopNav'
import { api } from '../api/api'
import toast from 'react-hot-toast'

export const DashboardNav = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [large, setLarge] = useState(window.innerWidth > 800)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setLarge(window.innerWidth > 800)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleLogOut = async() => {
        try {
            const response = await api.get('/auth/logout')
            if(response.status === 200) {
                toast.success("Logged out successfully")
                navigate('/')
            }
        }catch(err) {
            console.log('Error occured while logging out', err)
            toast.error("Can't logout, try again later")
        }
    } 

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }
    return (
        <>
            <div className="dashboard-nav">
                {large ?
                <div className="dashboard-desktop-nav flex">
                    <DesktopNav handleLogout={handleLogOut}/>
                    <Outlet/>
                </div> :
                <div className="dashboard-mobile-nav flex flex-col">
                    <MobileNav showMenu={showMenu} handleShowMenu={handleShowMenu} />
                    {showMenu ? <MobileNavOptions handleLogout={handleLogOut}/> : <Outlet/>}
                </div>
                }        
            </div>          
        </>
    )
}


