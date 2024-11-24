import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Users from "./pages/Users.tsx";
import Courses from "./pages/Courses.tsx";
import Enrollments from "./pages/Enrollments.tsx";
import Home from "./pages/Home.tsx";
import './App.scss';
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import SignedRoot from "./pages/SignedRoot.tsx";
import Profile from "./pages/Profile.tsx";
import MainRoot from "./pages/MainRoot.tsx";



const router = createBrowserRouter([{
    path: '/',
    element: <MainRoot />,
    children: [{
            index: true,
            element: <Home />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'signup',
            element: <Signup />
        },
        {
            path: 'signed',
            element: <SignedRoot />,
            children: [{
                index: true,
                path: 'profile',
                element: <Profile />
                },
                {
                    path: 'users',
                    element: <Users />,
                },
                {
                    path: 'courses',
                    element: <Courses />
                },
                {
                    path: 'enrollments',
                    element: <Enrollments />
                }
            ]
        }
    ]
}]);


function App() {

    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App
