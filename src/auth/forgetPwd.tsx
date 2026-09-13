import { NavLink } from "react-router-dom"
import { useActionState, useState } from "react"
import { api } from '../api/api'
import { AxiosError } from "axios"

type FormState = {
    error?: string,
}


export const ForgetPwd = () => {

        const [emailSendConfirmation, setEmailSendConfirmation] = useState(false)

        const forgetPwdAction = async(prevState: FormState, formData : FormData) => {

            const email = formData.get('email')
            

            if(!email) {
                return {
                    error: 'Email cannot be empty'
                }
            }

            try {
                const response = await api.post('/auth/forgetPwd', { email })
                if(response.status === 200) {
                    setEmailSendConfirmation(true)
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

    const [formState, formAction, pending] = useActionState(forgetPwdAction, {})


    return (
        <>{ (emailSendConfirmation && !formState.error)?
            <EmailSendConfirmation/>
            :
            <div className="forgetPwd-block flex justify-center items-center min-h-screen">
                <form action={formAction} className="shadow-lg border-gray-200 border rounded px-6 py-4 pb-8 mx-auto max-w-100 w-[90%]">
                    <h2 className="text-center font-bold text-2xl mb-3 mt-1">Verify email</h2>
                    {formState.error && <p className="text-red-500 text-[1.05em] mt-1">{formState.error}</p>}
                    <div className="auth-input-blocks flex flex-col mt-2 text-[1.2em]">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="px-2 py-1 border rounded" placeholder="Enter your email" name="email" />
                    </div>
                    <button type="submit" className="bg-(--primary-teal) text-white w-full text-2xl font-semibold rounded px-2 py-1.5 my-4 mx-auto flex justify-center hover:cursor-pointer hover:opacity-80 transition-opacity duration-300" disabled={pending}>{pending ? "Verifying..." : "Verify Email"}</button>
                    <p className="text-center text-[1.1em]">Remember the password?<NavLink to='/signIn' replace={true} className='text-(--primary-teal)'>Sign In</NavLink></p>
                </form>
            </div>
            }   
        </>
    )
}


const EmailSendConfirmation = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center border-gray-400 border-2 rounded-2xl py-5 px-4 ">
                <p className="text-green-400">Password reset email has been sent. Check your inbox</p>
                <NavLink to='/signIn' replace={true} className="bg-green-500 text-white py-1 px-2 rounded-2xl mt-4 ">Confirm</NavLink>
            </div>
        </div>
        </>
    )
}