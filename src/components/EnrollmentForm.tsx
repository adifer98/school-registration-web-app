import Enrollment from "../interfaces/Enrollment.ts";
import React, {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {format} from "date-fns";
import useManagementStore, {resultProps} from "../store/ManagementStore.ts";
import {Button, Dialog, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import useAlertState from "../store/AlertStateStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";

interface TextFieldsErrorProps {
    id: resultProps;
    userId: resultProps;
    courseId: resultProps;
}


interface EnrollmentFormProps {
    open: boolean;
    onClose: () => void;
}

export default function EnrollmentForm(props: EnrollmentFormProps) {

    const [value, setValue] = useState<Dayjs>(dayjs(format(new Date(), 'yyyy-MM-dd')));
    const [textFieldsError, setTextFieldsError] = useState<TextFieldsErrorProps>({
        id:  {
            succeeded: true,
            message: ""
        },
        userId:  {
            succeeded: true,
            message: ""
        },
        courseId:  {
            succeeded: true,
            message: ""
        }
    })

    const setAlertState = useAlertState(state => state.setAlertState);

    const addEnrollment = useManagementStore(state => state.addEnrollment);
    const state = useUserStateStore(state => state.state);
    const isEnrollmentIdNotExists = useManagementStore(state => state.isEnrollmentIdNotExists);
    const isCourseIdExists = useManagementStore(state => state.isCourseIdExists);
    const isUserIdExists = useManagementStore(state => state.isUserIdExists);

    useEffect(() => {
        setTextFieldsError({
            id:  {
                succeeded: true,
                message: ""
            },
            userId:  {
                succeeded: true,
                message: ""
            },
            courseId:  {
                succeeded: true,
                message: ""
            }
        })
    }, [props.open, setTextFieldsError]);


    const {open, onClose} = props;

    function checkErrors(id: string, userId: string, courseId: string) {
        const idCheckResult = isEnrollmentIdNotExists(id);
        const userIdCheckResult = isUserIdExists(userId);
        const courseIdCheckResult = isCourseIdExists(courseId);

        setTextFieldsError({
            id: idCheckResult,
            userId: userIdCheckResult,
            courseId: courseIdCheckResult
        })
    }

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const createdDate = value?.toDate();
        const data = {...Object.fromEntries(formData.entries()), createdDate} as Enrollment;
        if (state.userRole === "Student") {
            data.userId = state.userId;
        }
        console.log(data);
        const operationState = addEnrollment(data);
        setAlertState({...operationState, open: true});

        if (operationState.succeeded) {
            onClose();
        } else {
            checkErrors(data.id, data.userId, data.courseId);
        }

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
                            error={!textFieldsError.id.succeeded}
                            helperText={textFieldsError.id.message}
                        />
                    </p>
                    <p>
                        <TextField
                            name="userId"
                            label="User ID"
                            variant="outlined"
                            required
                            defaultValue={state.userRole === "Student" ? state.userId : ""}
                            disabled={state.userRole === "Student"}
                            error={!textFieldsError.userId.succeeded}
                            helperText={textFieldsError.userId.message}
                        />
                    </p>
                    <p>
                        <TextField
                            name="courseId"
                            label="Course ID"
                            variant="outlined"
                            required
                            error={!textFieldsError.courseId.succeeded}
                            helperText={textFieldsError.courseId.message}
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