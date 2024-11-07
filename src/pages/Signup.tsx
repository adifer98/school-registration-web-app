import {Button, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";

export default function Signup() {
    return (
        <div className="signup-wrapper">
            <div className="signup-form-header">
                <h2>Welcome!</h2>
            </div>

            <div className="signup-form-body">
                <form>
                    <TextField variant="outlined" label="Write your username" required />
                    <TextField variant="outlined" type="password" label="Write your password" required />

                    <Button variant="contained">Signup</Button>
                </form>
            </div>
            <div className="signup-form-footer">
                <p>Already have an account?</p>
                <NavLink to="/login">Login</NavLink>
            </div>

        </div>
    )
}