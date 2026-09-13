import { useState, useActionState } from "react"
import VisibilityOn from '../assets/visibility_on.svg?react'
import VisibilityOff from '../assets/visibility_off.svg?react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/api'
import { AxiosError } from "axios"
import toast from "react-hot-toast"

type FormState = {
    error?: string,
}

export const ResetPwd = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const token = params.token

    const resetPwdAction = async(prevState: FormState, formData : FormData) => {

        const password = formData.get('password')
        const confirmPassword = formData.get('confirmPassword')
        


        if(!password) {
            return {
                error: 'Password cannot be empty'
            }
        }

        if(!confirmPassword) {
            return {
                error: 'Confirm password cannot be empty'
            }
        }

        if(password !== confirmPassword) {
            return {
                error: 'Passwords do not match'
            }
        }

        try {
            const response = await api.post('/auth/resetPwd', { newPassword: password, token })
            if(response.status === 200) {
                navigate('/signIn', { replace: true })
                toast.success('Password reset successfully', { duration: 3000 })
                return {}
            }
        }catch(err) {
                    toast.error('Error occurred while resetting password', { duration: 3000 });
                    console.log("Error occurred while resetting password:", err);
        
                    if (err instanceof AxiosError && !err.response) {
                        return {
                           error: "Network error. Please check your internet connection and try again." 
                        }         
                    }
        
                    const errStatus = err instanceof AxiosError ? err.response?.status : "Unknown"
        
                    switch (errStatus) {
                        case 400:
                            return {
                                error: "Invalid request. Please check the input fields."
                            }
        
                        case 429:
                            return {
                                error: "Too many requests. Please try again later."
                            }
        
                        case 500:
                            return {
                                error: "Server error. Please try again later."
                            }
        
                        default:
                            return {
                                error: "Something went wrong"
                            }
                    }
                }
        return {}
    }

    const [formState, formAction, pending] = useActionState(resetPwdAction, {})

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    return (
        <>
            <div className="resetPwd-block flex justify-center items-center min-h-screen">
                <form action={formAction} className="shadow-lg border-gray-200 border rounded px-6 py-4 pb-8 mx-auto max-w-100 w-[90%]">
                    <h2 className="text-center font-bold text-2xl mb-3 mt-1">Reset password</h2>
                    {formState.error && <p className="text-red-500 text-[1.05em] mt-1">{formState.error}</p>}
                    <div className="auth-input-blocks flex flex-col mt-5 mb-6 text-[1.2em] relative">
                        <label htmlFor="password">Password</label>
                        <input type={showPassword ? 'text' : 'password'} className="px-2 py-1 pe-10 border rounded" placeholder="Enter new password" name="password" />
                        <div className="eye-icon p-1 w-8 h-8 rounded-[0.6rem] text-black absolute top-8 left-[90%] max-[410px]:left-[87%] max-[310px]:left-[84%]" onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOn className="w-6 h-6"/> : <VisibilityOff className="w-6 h-6"/>}
                        </div>
                    </div>
                    <div className="auth-input-blocks flex flex-col mt-5 mb-6 text-[1.2em] relative">
                        <label htmlFor="password">Confirm Password</label>
                        <input type={showPassword ? 'text' : 'password'} className="px-2 py-1 pe-10 border rounded" placeholder="Confirm password" name="confirmPassword" />
                        <div className="eye-icon p-1 w-8 h-8 rounded-[0.6rem] text-black absolute top-8 left-[90%] max-[410px]:left-[87%] max-[310px]:left-[84%]" onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOn className="w-6 h-6"/> : <VisibilityOff className="w-6 h-6"/>}
                        </div>
                    </div>
                    <button type="submit" className="bg-(--primary-teal) text-white w-full text-2xl font-semibold rounded px-2 py-1.5 mx-auto flex justify-center hover:cursor-pointer duration-900 transition-all hover:bg-blue-500" disabled={pending}>
                        {pending ? 'Resetting...' : 'Reset password'}
                    </button>
                </form>
            </div>
        </>
    )
}
