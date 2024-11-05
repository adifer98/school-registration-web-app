import Enrollment from "../interfaces/Enrollment.ts";
import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {format} from "date-fns";
import useManagementStore from "../store/ManagementStore.ts";
import {Button, Dialog, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import useAlertState from "../store/AlertStateStore.ts";


interface EnrollmentFormProps {
    open: boolean;
    onClose: () => void;
}

export default function EnrollmentForm(props: EnrollmentFormProps) {

    const [value, setValue] = useState<Dayjs>(dayjs(format(new Date(), 'yyyy-MM-dd')));
    const setAlertState = useAlertState(state => state.setAlertState);

    const addEnrollment = useManagementStore(state => state.addEnrollment);

    const {open, onClose} = props;

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const createdDate = value?.toDate();
        const data = {...Object.fromEntries(formData.entries()), createdDate} as Enrollment;

        console.log(data);
        setAlertState({...addEnrollment(data), open: true});

        onClose();
    }


    return (

        <>

            <Dialog open={open} onClose={onClose}>
                <form onSubmit={submitHandler}>
                    <p>
                        <TextField
                            name="id"
                            label="Enrollment ID"
                            variant="outlined"
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="studentId"
                            label="Student ID"
                            variant="outlined"
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="courseId"
                            label="Course ID"
                            variant="outlined"
                            required
                        />
                    </p>
                    <p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Created Date"
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