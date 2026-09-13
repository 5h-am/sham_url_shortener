import { useState, useActionState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import VisibilityOn from '../assets/visibility_on.svg?react'
import VisibilityOff from '../assets/visibility_off.svg?react'
import { api } from '../api/api'
import toast from "react-hot-toast"
import { AxiosError } from "axios"



type FormState = {
    error?: string,
    passwordError?: string,
    fullNameError?: string,
    emailError?: string
}

export const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }


    const signUpAction = async(prevState: FormState, formData : FormData) => {

        const fullName = formData.get('fullName')
        const email = formData.get('email')
        const password = formData.get('password')
        
        if(!fullName) {
            return {
                fullNameError: 'Name cannot be empty'
            }
        }

        if(!email) {
            return {
                emailError: 'Email cannot be empty'
            }
        }

        if(!password) {
            return {
                passwordError: 'Password cannot be empty'
            }
        }

        try {
            const response = await api.post('/auth/signUp', { fullName, email, password })
            if(response.status === 201) {
                localStorage.setItem('accessToken', response.data.accessToken)
                navigate('/dashboard', { replace: true })
                toast.success('Account created successfully', { duration: 3000 })
                return {}
            }
        }catch(err) {
                    console.log("Error occurred while signing in:", err);
        
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

                        case 409:
                            return {
                                error: "Email already exists"
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

    const [formState, formAction, pending] = useActionState(signUpAction, {})



    return (
        <>
            <div className="signUp-block flex justify-center items-center min-h-screen">
                <form action={formAction} className="shadow-lg border-gray-200 border rounded px-6 py-4 pb-8 mx-auto max-w-100 w-[90%]">
                    <h2 className="text-center font-bold text-2xl mb-3 mt-1">Create a account</h2>
                    {formState.error && <p className="text-red-500 text-[1.05em] mt-1">{formState.error}</p>}
                    <div className="auth-input-blocks flex flex-col mt-2 text-[1.2em]">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" className="px-2 py-1 border rounded" placeholder="Full Name" name="fullName" />
                        {formState.fullNameError && <p className="text-red-500 text-[0.9em] mt-1 ms-1">{formState.fullNameError}</p>}
                    </div>
                    <div className="auth-input-blocks flex flex-col mt-5 text-[1.2em]">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="px-2 py-1 border rounded" placeholder="Enter your email" name="email" />
                        {formState.emailError && <p className="text-red-500 text-[0.9em] mt-1 ms-1">{formState.emailError}</p>}
                    </div>
                    <div className="auth-input-blocks flex flex-col mt-5 mb-6 text-[1.2em] relative">
                        <label htmlFor="password">Password</label>
                        <input type={showPassword ? 'text' : 'password'} className="px-2 py-1 pe-10 border rounded" placeholder="Password" name="password" />
                        {formState.passwordError && <p className="text-red-500 text-[0.9em] mt-1 ms-1">{formState.passwordError}</p>}
                        <div className="eye-icon p-1 w-8 h-8 rounded-[0.6rem] text-black absolute top-8 left-[90%] max-[410px]:left-[87%] max-[310px]:left-[84%]" onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOn className="w-6 h-6"/> : <VisibilityOff className="w-6 h-6"/>}
                        </div>
                    </div>
                    <button type="submit" className="bg-(--primary-teal) text-white w-full text-2xl font-semibold rounded px-2 py-1.5 mx-auto flex justify-center" disabled={pending}>{pending ? "Creating account..." : "Create a account"}</button>
                    <p className="text-center text-[1.1em] mt-3">Already have an account?<NavLink to='/signIn' replace={true} className='text-(--primary-teal)'>Sign In</NavLink></p>
                </form>
            </div>
        </>
    )
}