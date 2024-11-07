import {NavLink} from "react-router-dom";

export default function MainNavigation() {
    return (
        <header>
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to="/">Home</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to='/students'>Students</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to='/courses'>Courses</NavLink>
            <NavLink className={({isActive})=> isActive ? "active" : "inactive"} to='/enrollments'>Enrollments</NavLink>
        </header>
    )
}