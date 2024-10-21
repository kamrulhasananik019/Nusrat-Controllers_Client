import { createBrowserRouter, } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import LogIn from "../Pages/LogIn/LogIn";
import Dashboard from "../Layout/Dashboard";
import AllUser from "../Pages/AllDashBoard/Admin/AllUser/AllUser";
import PrivateRoute from "./PrivateRoute";
import AddInsights from "../Pages/AllDashBoard/Admin/AddInsights/AddInsights";

import ManageServices from "../Pages/AllDashBoard/Admin/ManageServices/ManageServices";
import SignUp from "../Pages/SignUp/SignUp";

import AdminRoute from "./AdminRoute";
import AddPortfolio from "../Pages/AllDashBoard/Admin/AddPortfolio/AddPortfolio";
import DeletedPortfolio from "../Pages/AllDashBoard/Admin/Deleted portfolio/Deletedportfolio";
import AddExperience from "../Pages/AllDashBoard/Admin/AddExperience/AddExperience";
import DeleteExperience from "../Pages/AllDashBoard/Admin/DeleteExperience/DeleteExperience";
import AddServices from "../Pages/AllDashBoard/Admin/AddServices/AddServices";
import DeleteServices from "../Pages/AllDashBoard/Admin/DeleteServices/DeleteServices";
import AddReview from "../Pages/AllDashBoard/Admin/AddReview/AddReview";
import DeleteReview from "../Pages/AllDashBoard/Admin/DeleteReview/DeleteReview";
import DeleteSlider from "../Pages/AllDashBoard/Admin/DeleteSlider/DeleteSlider";
import AddSlider from "../Pages/AllDashBoard/Admin/AddSlider/AddSlider";
import ManageProfile from "../Pages/AllDashBoard/Admin/ManageProfile/ManageProfile";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            }
            , {
                path: "login",
                element: <LogIn></LogIn>
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: "allusers",
                        element: <AdminRoute><AllUser /></AdminRoute>
                    },

                    {
                        path: "manageprofile",
                        element: <AdminRoute><ManageProfile /></AdminRoute>
                    },
                    {
                        path: "addexperience",
                        element: <AdminRoute><AddExperience /></AdminRoute>
                    },
                    {
                        path: "deleteexperience",
                        element: <AdminRoute><DeleteExperience /></AdminRoute>
                    },
                    {
                        path: "addservices",
                        element: <AdminRoute><AddServices /></AdminRoute>
                    },
                    {
                        path: "deleteservices",
                        element: <AdminRoute><DeleteServices /></AdminRoute>
                    },
                    {
                        path: "addportfolio",
                        element: <AdminRoute><AddPortfolio /></AdminRoute>
                    },
                    {
                        path: "deletedportfolio",
                        element: <AdminRoute><DeletedPortfolio /></AdminRoute>
                    },
                    {
                        path: "addslider",
                        element: <AdminRoute><AddSlider /></AdminRoute>
                    },
                    {
                        path: "deletedslider",
                        element: <AdminRoute><DeleteSlider /></AdminRoute>
                    },
                    {
                        path: "addreview",
                        element: <AdminRoute><AddReview /></AdminRoute>
                    },
                    {
                        path: "deletereview",
                        element: <AdminRoute><DeleteReview /></AdminRoute>
                    },
                    {
                        path: "manageservices",
                        element: <ManageServices />
                    },
                    {
                        path: "addinsights",
                        element: <AddInsights />
                    },
                ]
            }
        ]
    },
]);
