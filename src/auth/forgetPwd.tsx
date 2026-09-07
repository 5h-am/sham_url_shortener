import { NavLink } from "react-router-dom"

export const ForgetPwd = () => {

    return (
        <>
            <div className="forgetPwd-block flex justify-center items-center min-h-screen">
                <form action="" className="shadow-lg border-gray-200 border rounded px-6 py-4 pb-8 mx-auto max-w-100 w-[90%]">
                    <h2 className="text-center font-bold text-2xl mb-3 mt-1">Verify email</h2>
                    <div className="auth-input-blocks flex flex-col mt-2 text-[1.2em]">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="px-2 py-1 border rounded" placeholder="Enter your email" />
                    </div>
                    <button type="submit" className="bg-(--primary-teal) text-white w-full text-2xl font-semibold rounded px-2 py-1.5 my-4 mx-auto flex justify-center">Verify Email</button>
                    <p className="text-center text-[1.1em]">Remember the password?<NavLink to='/signIn' className='text-(--primary-teal)'>Sign In</NavLink></p>
                </form>
            </div>
        </>
    )
}