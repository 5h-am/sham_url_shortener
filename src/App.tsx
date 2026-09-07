import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./landing/landing";
import { SignIn } from "./auth/signIn";
import { SignUp } from "./auth/signUp";
import { ForgetPwd } from "./auth/forgetPwd";
import { ResetPwd } from "./auth/resetPwd";
import { DashboardNav } from "./dashboard/dashboard";
import { MyLinks } from "./dashboard/myLinks";
import { AnalyticsPage } from "./dashboard/analytics";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }, {path: '/signIn', element: <SignIn/>},
    {path: '/signUp', element: <SignUp/>},
    {path: '/forget-pwd', element: <ForgetPwd/>},
    {path:'/reset-pwd', element: <ResetPwd/>},
    {path:'/dashboard/:userId', element: <DashboardNav/>,
        children:[
            {index: true, element: <MyLinks/>},
            {path: 'analysis', element: <AnalyticsPage/>}
        ]
    }
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
