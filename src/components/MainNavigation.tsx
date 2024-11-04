import {NavLink} from "react-router-dom";

export default function MainNavigation() {
    return (
        <header>
            <div>
                <NavLink to='/students'>Students</NavLink>
                <NavLink to='/courses'>Courses</NavLink>
                <NavLink to='/enrollments'>Enrollments</NavLink>
            </div>
        </header>
    )
}