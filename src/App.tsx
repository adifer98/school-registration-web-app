import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Users, {usersLoader} from "./pages/Users.tsx";
import Courses from "./pages/Courses.tsx";
import Enrollments from "./pages/Enrollments.tsx";
import Home from "./pages/Home.tsx";
import './App.scss';
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter([{
    path: '/',
    element: <Outlet/>,
    children: [{
            index: true,
            element: <Home/>
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
            element: <Root />,
            children: [{
                    index: true,
                    path: 'users',
                    element: <Users/>,
                    loader: usersLoader
                },
                {
                    path: 'courses',
                    element: <Courses/>
                },
                {
                    path: 'enrollments',
                    element: <Enrollments/>
                }]
        }]
    }
]);

function App() {

    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App
