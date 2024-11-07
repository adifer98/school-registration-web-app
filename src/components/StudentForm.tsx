import Student from "../interfaces/Student.ts";
import React, {useState} from "react";
import { Button, Dialog, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";
import useManagementStore from "../store/ManagementStore.ts";
import {format} from "date-fns";
import useAlertState from "../store/AlertStateStore.ts";


interface StudentFormProps {
    method: 'ADD' | 'UPDATE';
    student: Student | null;
    open: boolean;
    onClose: () => void;
}


export default function StudentForm(props: StudentFormProps) {

    const [value, setValue] = useState<Dayjs>(dayjs(format(props.student ? props.student.registrationDate : new Date(), 'yyyy-MM-dd')));
    const setAlertState = useAlertState(state => state.setAlertState);

    const addStudent = useManagementStore(state => state.addStudent);
    const updateStudent = useManagementStore(state => state.updateStudent);

    const {method, student, open, onClose} = props;


    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const registrationDate = value?.toDate();
        const data = {...Object.fromEntries(formData.entries()), registrationDate} as Student;
        if (student !== null){
            data.id = student.id;
        }
        console.log(data);
        if (method === "ADD") {
            setAlertState({...addStudent(data), open: true});
        } else {
            setAlertState({...updateStudent(data), open: true});
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
                            label="Student ID"
                            variant="outlined"
                            defaultValue={student ? student.id : ""}
                            required
                            disabled={student !== null}
                        />
                    </p>
                    <p>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            defaultValue={student ? student.name : ""}
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            defaultValue={student ? student.email : ""}
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="city"
                            label="City"
                            variant="outlined"
                            defaultValue={student ? student.city : ""}
                            required
                        />
                    </p>
                    <p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Registration Date"
                                    value={value}
                                    onChange={(newDate) => newDate && setValue(newDate)}
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


