import {Button, MenuItem, TextField} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useRef, useState} from "react";
import useAuthStore from "../store/AuthStore.ts";
import User from "../interfaces/User.ts";
import useAlertState from "../store/AlertStateStore.ts";
import useManagementStore, {resultProps} from "../store/ManagementStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";


interface TextFieldsErrorProps {
    id: resultProps;
    email: resultProps;
    passwordConfirmation: resultProps;
}

export default function Signup() {

    const [roleValue, setRoleValue] = useState<"Student" | "Admin">("Student");
    const [textFieldsError, setTextFieldsError] = useState<TextFieldsErrorProps>({
        id: {
            succeeded: true,
            message: ""
        },
        email: {
            succeeded: true,
            message: ""
        },
        passwordConfirmation: {
            succeeded: true,
            message: ""
        }
    })

    useEffect(() => {
        setTextFieldsError({
            id: {
                succeeded: true,
                message: ""
            },
            email: {
                succeeded: true,
                message: ""
            },
            passwordConfirmation: {
                succeeded: true,
                message: ""
            }
        });
    }, []);

    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    const addApproval = useAuthStore(state => state.addApproval);
    const setAlertState = useAlertState(state => state.setAlertState);
    const addUser = useManagementStore(state => state.addUser);
    const setState = useUserStateStore(state => state.setState);
    const navigate = useNavigate();
    const isEmailNotExist = useAuthStore(state => state.isEmailNotExist);
    const isUserIdNotExists = useManagementStore(state => state.isUserIdNotExists);
    const isPasswordConfirm = useAuthStore(state => state.isPasswordConfirm);

    function checkErrors(id: string, email: string, password: string, passwordConfirmation: string) {
        const idCheckResult = isUserIdNotExists(id);
        const emailCheckResult = isEmailNotExist(email);
        const passwordConfirmCheckResult = isPasswordConfirm (password, passwordConfirmation);

        setTextFieldsError({
            id: idCheckResult,
            email: emailCheckResult,
            passwordConfirmation: passwordConfirmCheckResult
        })
    }

    function signupHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const registrationDate = new Date();
        const data = {...Object.fromEntries(formData.entries()), registrationDate} as User;
        console.log(data);
        const approval = {
            email: data.email,
            password: passwordRef.current!.value,
        }
        console.log(approval)

        const addUserState = addUser(data, isEmailNotExist);

        if (addUserState.succeeded) {
            const signupState = addApproval(approval, passwordConfirmationRef.current!.value);
            setAlertState({...signupState, open: true});
            if (signupState.succeeded) {
                setState({userId: data.id, userRole: data.role});
                navigate('/signed/profile');
                return;
            }
        }
        checkErrors(data.id, data.email, passwordRef.current!.value, passwordConfirmationRef.current!.value);
    }

    return (
        <div className="auth-wrapper">
            <h2>Welcome!</h2>

            <form onSubmit={signupHandler}>
                <TextField
                    name="id"
                    variant="outlined"
                    label="Your ID"
                    required
                    error={!textFieldsError.id.succeeded}
                    helperText={textFieldsError.id.message}
                />
                <TextField
                    name="name"
                    variant="outlined"
                    label="Your name"
                    required
                />

                <TextField
                    name="city"
                    variant="outlined"
                    label="Your city"
                    required
                />
                <TextField
                    select
                    name="role"
                    label="Role"
                    value={roleValue}
                >
                    <MenuItem value='Student' onClick={() => setRoleValue('Student')}>
                        Student
                    </MenuItem>
                    <MenuItem value='Admin' onClick={() => setRoleValue('Admin')}>
                        Admin
                    </MenuItem>
                </TextField>
                <TextField
                    name="email"
                    variant="outlined"
                    type="email"
                    label="Your email"
                    required
                    error={!textFieldsError.email.succeeded}
                    helperText={textFieldsError.email.message}
                />
                <TextField
                    variant="outlined"
                    inputRef={passwordRef}
                    type="password"
                    label="Your password"
                    required
                    error={!textFieldsError.passwordConfirmation.succeeded}
                />
                <TextField
                    variant="outlined"
                    inputRef={passwordConfirmationRef}
                    type="password"
                    label="Password confirmation"
                    required
                    error={!textFieldsError.passwordConfirmation.succeeded}
                    helperText={textFieldsError.passwordConfirmation.message}
                />

                <Button variant="contained" type="submit">Signup</Button>
            </form>

            <div className="auth-footer">
                <p>Already have an account?</p>
                <NavLink to="/login">Login</NavLink>
            </div>

        </div>
    )
}