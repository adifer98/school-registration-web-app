import {Button, TextField} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import useAlertState from "../store/AlertStateStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";
import useUsersStore, {resultProps} from "../store/UsersStore.ts";


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

    const setAlertState = useAlertState(state => state.setAlertState);
    const setState = useUserStateStore(state => state.setState);
    const getStateByEmail = useUsersStore(state => state.getStateByEmail);
    const isEmailExists = useUsersStore(state => state.isEmailExists);
    const isPasswordCorrect = useUsersStore(state => state.isPasswordCorrect);

    const navigate = useNavigate();

    function checkInputs(email: string, password: string) : resultProps {
        const emailCheckResult = isEmailExists(email);
        const passwordCheckResult = isPasswordCorrect(email, password);

        if (emailCheckResult.succeeded && passwordCheckResult.succeeded) {
            return {succeeded: true, message: "Logged in successfully!"};
        }

        setTextFieldsError({
            email: emailCheckResult,
            password: passwordCheckResult
        });
        return {succeeded: false, message: "Could not log in"};
    }

    function loginHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {...Object.fromEntries(formData.entries())} as {email: string; password: string};
        console.log(data);
        const state = checkInputs(data.email, data.password);
        setAlertState({...state, open: true});
        if (state.succeeded) {
            const state = getStateByEmail(data.email);
            setState(state);
            navigate('/signed/profile');
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


