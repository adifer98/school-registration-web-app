import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import useUserStateStore from "../store/UserStateStore.ts";

export default function MainNavigation() {

    const state = useUserStateStore(state => state.state);
    const navigate = useNavigate();

    return (
        <>
            <header className="navigation">
                <NavLink
                    className={({isActive}) => isActive ? "active" : "inactive"}
                    to='/signed/profile'
                >
                    Profile
                </NavLink>
                {state.userRole === "Admin" && <NavLink
                    className={({isActive}) => isActive ? "active" : "inactive"}
                    to='/signed/users'
                >
                    Users
                </NavLink>
                }
                <NavLink
                    className={({isActive}) => isActive ? "active" : "inactive"}
                    to='/signed/courses'
                >
                    Courses
                </NavLink>
                <NavLink
                    className={({isActive}) => isActive ? "active" : "inactive"}
                     to='/signed/enrollments'
                >
                    Enrollments
                </NavLink>
            </header>

            <div className="logout-btn">
                <Button variant="contained" onClick={() => navigate('/')}>Log Out</Button>
            </div>
        </>

    )
}