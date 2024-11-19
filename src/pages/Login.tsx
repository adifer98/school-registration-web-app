import {Button, TextField} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import useAuthStore from "../store/AuthStore.ts";
import useAlertState from "../store/AlertStateStore.ts";
import useManagementStore, {resultProps} from "../store/ManagementStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";


interface TextFieldsErrorProps {
    email: resultProps;
    password: resultProps;
}

export default function Login() {

    const [textFieldsError, setTextFieldsError] = useState<TextFieldsErrorProps>({
        email: {
            succeeded: true,
            message: ""
        },
        password: {
            succeeded: true,
            message: ""
        }
    })

    useEffect(() => {
        setTextFieldsError({
            email: {
                succeeded: true,
                message: ""
            },
            password: {
                succeeded: true,
                message: ""
            }
        });
    }, []);

    const checkApproval = useAuthStore(state => state.checkApproval);
    const setAlertState = useAlertState(state => state.setAlertState);
    const setState = useUserStateStore(state => state.setState);
    const getStateByEmail = useManagementStore(state => state.getStateByEmail);
    const approvals = useAuthStore(state => state.userApprovals)
    const isEmailExists = useAuthStore(state => state.isEmailExists)
    const isPasswordCorrect = useAuthStore(state => state.isPasswordCorrect)

    const navigate = useNavigate();

    function checkErrors(email: string, password: string) {
        const emailCheckResult = isEmailExists(email);
        const passwordCheckResult = isPasswordCorrect(email, password);
        setTextFieldsError({
            email: emailCheckResult,
            password: passwordCheckResult
        });
    }

    function loginHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(approvals)
        const formData = new FormData(event.currentTarget);
        const data = {...Object.fromEntries(formData.entries())} as {email: string; password: string};
        console.log(data);
        const state = checkApproval(data);
        setAlertState({...state, open: true});
        if (state.succeeded) {
            const state = getStateByEmail(data.email);
            setState(state);
            navigate('/signed/profile');
        } else {
            checkErrors(data.email, data.password);
        }
    }

    return (

        <div className="auth-wrapper">
            <h2>Log in</h2>

            <form onSubmit={loginHandler}>
                <TextField
                    name="email"
                    variant="outlined"
                    type="email"
                    label="Email"
                    required
                    error={!textFieldsError.email.succeeded}
                    helperText={textFieldsError.email.message}
                />
                <TextField
                    name="password"
                    variant="outlined"
                    type="password"
                    label="Password"
                    required
                    error={!textFieldsError.password.succeeded}
                    helperText={textFieldsError.password.message}
                />

                <Button variant="contained" type='submit'>Login</Button>
            </form>

            <div className="auth-footer">
                <p>Do you have an account?</p>
                <NavLink to="/signup">Create an account</NavLink>
            </div>
        </div>

    )
}


