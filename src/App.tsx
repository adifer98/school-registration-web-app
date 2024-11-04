import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Students from "./pages/Students.tsx";
import Courses from "./pages/Courses.tsx";
import Enrollments from "./pages/Enrollments.tsx";
import Home from "./pages/Home.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter([{
    path: '/',
    element: <Root/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: 'students',
            element: <Students/>,
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
