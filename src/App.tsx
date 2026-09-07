import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./landing/landing";
import { SignIn } from "./auth/signIn";
import { SignUp } from "./auth/signUp";
import { ForgetPwd } from "./auth/forgetPwd";
import { ResetPwd } from "./auth/resetPwd";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }, {path: '/signIn', element: <SignIn/>},
    {path: '/signUp', element: <SignUp/>},
    {path: '/forget-pwd', element: <ForgetPwd/>},
    {path:'/reset-pwd', element: <ResetPwd/>}
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
