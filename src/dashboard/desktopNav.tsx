import { NavLink } from "react-router-dom"
import LogOut from '../assets/logout.svg?react'

export const DesktopNav = () => {
    return (
        <>
            <div className="desktop-nav w-[20%] bg-(--primary-teal) h-screen text-white">
                <p className="text-2xl font-semibold ms-8 pt-2">Sham</p>
                <div className="flex flex-col justify-between mt-8 grow h-[88vh]">
                    <div className="flex flex-col gap-4 text-[1.3em] ms-8">
                        <NavLink to='myLinks' className="font-medium">My Links</NavLink>
                        <NavLink to='analysis' className="font-medium">Analysis</NavLink>     
                    </div>
                    <div className="account-details ms-4 text-1xl font-semibold">
                        <div>
                            <p>Shubham Kumar</p>
                            <p>test@gmail.com</p>
                        </div>
                        <button className='py-3 text-2 font-extrabold flex gap-0.5 hover:cursor-pointer'><LogOut/>Log Out</button>
                    </div>
                </div>

            </div>
        </>
    )
}