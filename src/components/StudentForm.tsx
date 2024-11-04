import Student from "../interfaces/Student.ts";
import React, {useState} from "react";
import useStore from "../store/Store.ts";
import {Button, Dialog, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";

interface StudentFormProps {
    method: 'ADD' | 'UPDATE';
    student: Student | null;
    open: boolean;
    onClose: () => void;
}

export default function StudentForm(props: StudentFormProps) {

    const [value, setValue] = useState<Dayjs>(dayjs('2022-04-17'));

    const addStudent = useStore(state => state.addStudent);
    const updateStudent = useStore(state => state.updateStudent);

    const {method, open, onClose} = props;

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const registrationDate = value?.toDate();
        const data = {...Object.fromEntries(formData.entries()), registrationDate} as Student;

        console.log(data);
        if (method === "ADD") {
            addStudent(data);
        } else {
            updateStudent(data);
        }

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={submitHandler}>
                <p>
                    <TextField name="id" label="Student ID" variant="outlined" required />
                </p>
                <p>
                    <TextField name="name" label="Name" variant="outlined" required />
                </p>
                <p>
                    <TextField name="email" label="Email" variant="outlined" required />
                </p>
                <p>
                    <TextField name="city" label="City" variant="outlined" required />
                </p>
                <p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Registration Date"
                                value={value}
                                onChange={(newDate) => setValue(newDate)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </p>

                <div>
                    <Button type="button" variant="filled" onClick={onClose}>Exit</Button>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </Dialog>
    )
}