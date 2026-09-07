import { useState } from "react"
import { NavLink } from "react-router-dom"
import VisibilityOn from '../assets/visibility_on.svg?react'
import VisibilityOff from '../assets/visibility_off.svg?react'

export const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    return (
        <>
            <div className="signIn-block flex justify-center items-center min-h-screen">
                <form action="" className="shadow-lg border-gray-200 border rounded px-6 py-4 pb-8 mx-auto max-w-100 w-[90%]">
                    <h2 className="text-center font-bold text-2xl mb-3 mt-1">Sign In</h2>
                    <div className="auth-input-blocks flex flex-col mt-2 text-[1.2em]">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="px-2 py-1 border rounded" placeholder="Enter your email" />
                    </div>
                    <div className="auth-input-blocks flex flex-col mt-5 mb-6 text-[1.2em] relative">
                        <label htmlFor="password">Password</label>
                        <input type={showPassword ? 'text' : 'password'} className="px-2 py-1 pe-10 border rounded" placeholder="Password" />
                        <div className="eye-icon p-1 w-8 h-8 rounded-[0.6rem] text-black absolute top-8 left-[90%] max-[410px]:left-[87%] max-[310px]:left-[84%]" onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOn className="w-6 h-6"/> : <VisibilityOff className="w-6 h-6"/>}
                        </div>
                    </div>
                    <button type="submit" className="bg-(--primary-teal) text-white w-full text-2xl font-semibold rounded px-2 py-1.5 mx-auto flex justify-center">Sign In</button>
                    <NavLink to='/forget-pwd'><p className="text-gray-400 flex justify-end text-1xl mb-4">Forgot Password?</p></NavLink>
                    <p className="text-center text-[1.1em]">New user?<NavLink to='/signUp' className='text-(--primary-teal)'>Create a Account</NavLink></p>
                </form>
            </div>
        </>
    )
}