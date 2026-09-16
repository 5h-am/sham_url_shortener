import "./App.css";
import "./api/interceptor"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./landing/landing";
import { SignIn } from "./auth/signIn";
import { SignUp } from "./auth/signUp";
import { ForgetPwd } from "./auth/forgetPwd";
import { ResetPwd } from "./auth/resetPwd";
import { DashboardNav } from "./dashboard/dashboard";
import { MyLinks } from "./dashboard/myLinks";
import { AnalyticsPage } from "./dashboard/analytics";
import { Toaster } from "react-hot-toast";
import { urlsLoader, analysisLoader} from "./loader";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }, {path: '/signIn', element: <SignIn/>},
    {path: '/signUp', element: <SignUp/>},
    {path: '/forget-pwd', element: <ForgetPwd/>},
    {path:'/resetPwd/:token', element: <ResetPwd/>},
    {path:'/dashboard', element: <DashboardNav/>,
        children:[
            {index: true, element: <MyLinks/>, loader:urlsLoader, id:'dashboard'},
            {path: 'analysis/:urlId', element: <AnalyticsPage/>, loader: analysisLoader}
        ]
    }
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster/>
        </>
    );
};

export default App;
