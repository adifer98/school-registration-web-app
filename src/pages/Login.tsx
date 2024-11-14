import {Button, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";

export default function Login() {
    return (

        <div className="login-wrapper">
            <div className="login-form-header">
                <h2>Log in</h2>
            </div>
            <div className="auth-form-body">
                <form>
                    <TextField variant="outlined" label="Username" required/>
                    <TextField variant="outlined" type="password" label="Password" required/>

                    <Button variant="contained">Login</Button>
                </form>
            </div>
            <div className="auth-form-footer">
                <p>Do you have an account?</p>
                <NavLink to="/signup">Create an account</NavLink>
            </div>
        </div>

    )
}


