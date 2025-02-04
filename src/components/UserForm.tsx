import User from "../interfaces/User.ts";
import React, {useEffect, useRef, useState} from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";
import {format} from "date-fns";
import useAlertState from "../store/AlertStateStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";
import useUsersStore, {resultProps} from "../store/UsersStore.ts";
import {useNavigate} from "react-router-dom";


interface TextFieldsErrorProps {
    id: resultProps;
    email: resultProps;
    passwordConfirmation: resultProps;
}


interface UserFormProps {
    method: 'ADD' | 'UPDATE' | 'SIGNUP';
    user: User | null;
    onClose: () => void;
}


export default function UserForm(props: UserFormProps) {

    const [dateValue, setDateValue] = useState<Dayjs>(dayjs(format(new Date(), 'yyyy-MM-dd')));
    const [roleValue, setRoleValue] = useState<"Student" | "Admin">(props.user ? props.user.role : "Student");
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

    const passwordConfirmationRef= useRef<HTMLInputElement>(null);

    const setAlertState = useAlertState(state => state.setAlertState);
    const addUser = useUsersStore(state => state.addUser);
    const updateUser = useUsersStore(state => state.updateUser);
    const isEmailNotExists = useUsersStore(state => state.isEmailNotExists);
    const isUserIdNotExists = useUsersStore(state => state.isUserIdNotExists);
    const state = useUserStateStore(state => state.state)
    const setState = useUserStateStore(state => state.setState);

    const navigate = useNavigate();

    useEffect(() => {
        if (props.user) {
            setDateValue(dayjs(format(props.user.registrationDate, "yyyy-MM-dd")))
        }
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
        })
    }, [setDateValue, setTextFieldsError, props.user]);

    const {method, user, onClose} = props;

    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function checkErrors(id: string, email: string , checkEmail: boolean,
                         password: string, passwordConfirmation: string) {
        const idCheckResult = isUserIdNotExists(id);
        const emailValidationResult = isValidEmail(email);
        let emailCheckResult = checkEmail ? isEmailNotExists(email) : {
            succeeded: true,
            message: ""
        };
        if (!emailValidationResult) {
            emailCheckResult = {
                succeeded: false,
                message: "Email is invalid"
            };
        }
        const passwordConfirmCheckResult = password !== passwordConfirmation ? {
            succeeded: false,
            message: "Passwords do not match"
        } : {
            succeeded: true,
            message: ""
        };


        setTextFieldsError({
            id: idCheckResult,
            email: emailCheckResult,
            passwordConfirmation: passwordConfirmCheckResult
        })

    }



    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const registrationDate = dateValue?.toDate();
        const data = {...Object.fromEntries(formData.entries()), registrationDate} as User;
        if (user !== null){
            data.id = user.id;
        }
        if (method === "UPDATE" && user?.role === "Student") {
            data.role = "Student";
        }
        console.log(data);


        const passwordConfirmation = passwordConfirmationRef.current!.value;

        if (!isValidEmail(data.email)) {
            checkErrors(data.id, data.email, true, data.password, passwordConfirmation);
            return;
        }

        if (method === "ADD" || method === "SIGNUP") {
            const state = addUser(data, passwordConfirmation);
            if (method === "ADD") {
                setAlertState({...state, open: true});
            }

            if (state.succeeded) {
                if (method === "SIGNUP") {
                    setAlertState({succeeded: true, message: "Account created successfully!", open: true});
                    setState({userId: data.id, userRole: data.role});
                    navigate('/signed/profile');
                    return;
                }
                onClose();
            } else {
                checkErrors(data.id, data.email, true, data.password, passwordConfirmation);
            }
        } else {
            const state = updateUser(data, passwordConfirmation);
            setAlertState({...state, open: true});
            if (state.succeeded) {
                onClose();
            } else {
                checkErrors(data.id, data.email, user!.email !== data.email, data.password, passwordConfirmation);
            }
        }
    }



    return (
        <>
            <form className="center-col" onSubmit={submitHandler}>
                <TextField
                    name="id"
                    label="User ID"
                    variant="outlined"
                    defaultValue={user ? user.id : ""}
                    required
                    disabled={user !== null}
                    error={user === null && !textFieldsError.id.succeeded}
                    helperText={user === null ? textFieldsError.id.message : ""}
                />
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    defaultValue={user ? user.name : ""}
                    required
                />
                <TextField
                    name="city"
                    label="City"
                    variant="outlined"
                    defaultValue={user ? user.city : ""}
                    required
                />

                <TextField
                    select
                    name="role"
                    label="Role"
                    value={roleValue}
                    disabled={!(state.userRole === 'Admin' || method !== 'UPDATE')}
                >
                    <MenuItem value='Student' onClick={() => setRoleValue('Student')}>
                        Student
                    </MenuItem>
                    <MenuItem value='Admin' onClick={() => setRoleValue('Admin')}>
                        Admin
                    </MenuItem>
                </TextField>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Registration Date"
                            value={dateValue}
                            onChange={(newDate) => newDate && setDateValue(newDate)}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    defaultValue={user ? user.email : ""}
                    required
                    error={!textFieldsError.email.succeeded}
                    helperText={textFieldsError.email.message}
                />

                <TextField
                    name="password"
                    variant="outlined"
                    type="password"
                    label="Password"
                    defaultValue={user ? user.password : ""}
                    required
                    error={!textFieldsError.passwordConfirmation.succeeded}
                />
                <TextField
                    variant="outlined"
                    inputRef={passwordConfirmationRef}
                    type="password"
                    label="Password confirmation"
                    defaultValue={user ? user.password : ""}
                    required
                    error={!textFieldsError.passwordConfirmation.succeeded}
                    helperText={textFieldsError.passwordConfirmation.message}
                />

                <div>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </>
    )
}


