import User from "../interfaces/User.ts";
import React, {useEffect, useState} from "react";
import {Button, Dialog, MenuItem, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";
import useManagementStore, {resultProps} from "../store/ManagementStore.ts";
import {format} from "date-fns";
import useAlertState from "../store/AlertStateStore.ts";
import useAuthStore from "../store/AuthStore.ts";

interface TextFieldsErrorProps {
    id: resultProps;
    email: resultProps;
}


interface UserFormProps {
    method: 'ADD' | 'UPDATE';
    user: User | null;
    open: boolean;
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
        }
    })

    const setAlertState = useAlertState(state => state.setAlertState);
    const updateEmail = useAuthStore(state => state.updateEmail);
    const addUser = useManagementStore(state => state.addUser);
    const updateUser = useManagementStore(state => state.updateUser);
    const isEmailNotExist = useAuthStore(state => state.isEmailNotExist);
    const isUserIdNotExists = useManagementStore(state => state.isUserIdNotExists);

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
            }
        })
    }, [setDateValue, setTextFieldsError, props.user]);

    const {method, user, open, onClose} = props;

    function checkErrors(id: string, email: string ,emailCheck: (email: string) => resultProps) {
        const idCheckResult = isUserIdNotExists(id);
        const emailCheckResult = emailCheck(email);

        setTextFieldsError({
            id: idCheckResult,
            email: emailCheckResult
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
        console.log(data);

        if (method === "ADD") {
            const state = addUser(data, isEmailNotExist);
            setAlertState({...state, open: true});
            if (state.succeeded) {
                onClose();
            } else {
                checkErrors(data.id, data.email, isEmailNotExist);
            }
        } else {
            let emailCheck = isEmailNotExist;
            if (user!.email === data.email) {
                emailCheck = (email: string) => ({
                    succeeded: (email !== ""),
                    message: ""
                });
            }
            const state = updateUser(data, emailCheck);
            setAlertState({...state, open: true});
            if (state.succeeded) {
                updateEmail(user!.email, data.email);
                onClose();
            } else {
                checkErrors(data.id, data.email, emailCheck);
            }
        }

    }



    return (
        <>
            <Dialog fullWidth open={open} onClose={onClose}>
                <form onSubmit={submitHandler}>
                    <p>
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
                    </p>
                    <p>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            defaultValue={user ? user.name : ""}
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            defaultValue={user ? user.email : ""}
                            required
                            error={!textFieldsError.email.succeeded}
                            helperText={textFieldsError.email.message}
                        />
                    </p>
                    <p>
                        <TextField
                            name="city"
                            label="City"
                            variant="outlined"
                            defaultValue={user ? user.city : ""}
                            required
                        />
                    </p>
                    <p>
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
                    </p>

                    <p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Registration Date"
                                    value={dateValue}
                                    onChange={(newDate) => newDate && setDateValue(newDate)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </p>


                    <div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </div>
                </form>
            </Dialog>
        </>

    )
}


