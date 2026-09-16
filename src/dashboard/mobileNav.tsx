import Menu from '../assets/menu.svg?react'
import Close from '../assets/close.svg?react'
import { NavLink } from 'react-router-dom'
import RightArrow from '../assets/chevron_right.svg?react'
import LogOut from '../assets/logout.svg?react'


export const MobileNav = ({ showMenu, handleShowMenu }: { showMenu: boolean, handleShowMenu: () => void }) => {

    return (
        <>
            <div className="mobile-nav border-b-2 border-grey-800  flex justify-between items-center">
                <NavLink to=''><p className='text-2xl font-bold ms-4'>Sham</p></NavLink>
                <div className="menu-icon w-14 h-14" onClick={handleShowMenu}>
                    {showMenu ? <Close className="w-12 h-12"/> : <Menu className="w-12 h-12"/>}
                </div>
            </div>
        </>
    )
}

export const MobileNavOptions = ({ handleLogout } : { handleLogout : () => void}) => {
    return (
        <>
            <div className="mobile-nav-options bg-(--accent-mint) h-[92vh] flex flex-col justify-between">
                <div className="options flex flex-col my-4 text-1xl font-semibold">
                    <NavLink to='myLinks' className='pb-2 w-[96%] mx-auto flex justify-between items-center'><p>My Links</p><RightArrow className="w-6 h-6"/></NavLink>
                </div>
                <div className="account-details border-gray-500 border-t-2 pt-6 flex flex-col items-center">
                    <button className='py-3 text-2 font-extrabold flex gap-0.5 hover:cursor-pointer mb-5' onClick={handleLogout}><LogOut/>Log Out</button>
                </div>
            </div>
        </>
    )
}