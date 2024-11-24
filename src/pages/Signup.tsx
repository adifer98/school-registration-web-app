import {NavLink} from "react-router-dom";
import UserForm from "../components/UserForm.tsx";




export default function Signup() {



    return (
        <div className="auth-wrapper">
            <h2>Welcome!</h2>

            <UserForm method='SIGNUP' user={null} onClose={() => {}} />

            <div className="auth-footer">
                <p>Already have an account?</p>
                <NavLink to="/login">Login</NavLink>
            </div>

        </div>
    )
}