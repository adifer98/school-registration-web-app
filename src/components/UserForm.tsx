import User from "../interfaces/User.ts";
import React, {useState} from "react";
import {Button, Dialog, MenuItem, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";
import useManagementStore from "../store/ManagementStore.ts";
import {format} from "date-fns";
import useAlertState from "../store/AlertStateStore.ts";


interface UserFormProps {
    method: 'ADD' | 'UPDATE';
    user: User | null;
    open: boolean;
    onClose: () => void;
}


export default function UserForm(props: UserFormProps) {

    const [dateValue, setDateValue] = useState<Dayjs>(dayjs(format(props.user ? props.user.registrationDate : new Date(), 'yyyy-MM-dd')));
    const [roleValue, setRoleValue] = useState<"Student" | "Admin">(props.user ? props.user.role : "Student");

    const setAlertState = useAlertState(state => state.setAlertState);

    const addUser = useManagementStore(state => state.addUser);
    const updateUser = useManagementStore(state => state.updateUser);

    const {method, user, open, onClose} = props;


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
            setAlertState({...addUser(data), open: true});
        } else {
            setAlertState({...updateUser(data), open: true});
        }

        onClose();
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
                                Course
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


