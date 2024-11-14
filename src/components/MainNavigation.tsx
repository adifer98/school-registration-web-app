import {NavLink} from "react-router-dom";

export default function MainNavigation() {
    return (
        <header className="navigation">
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to='/signed/users'>Users</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to='/signed/courses'>Courses</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to='/signed/enrollments'>Enrollments</NavLink>
        </header>
    )
}