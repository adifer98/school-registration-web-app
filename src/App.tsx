import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Students, {studentsLoader} from "./pages/Students.tsx";
import Courses from "./pages/Courses.tsx";
import Enrollments from "./pages/Enrollments.tsx";
import Home from "./pages/Home.tsx";
// import Root from "./pages/Root.tsx";
import './App.scss';
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";

const router = createBrowserRouter([{
    path: '/',
    element: <Outlet/>,
    children: [
        {
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
            path: 'students',
            element: <Students/>,
            loader: studentsLoader
        },
        {
            path: 'courses',
            element: <Courses/>
        },
        {
            path: 'enrollments',
            element: <Enrollments/>
        }]
    }
]);

function App() {

    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App
