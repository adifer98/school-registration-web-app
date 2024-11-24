import Enrollment from "../interfaces/Enrollment.ts";
import React, {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {format} from "date-fns";
import {Autocomplete, Button, Dialog, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import useAlertState from "../store/AlertStateStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";
import useEnrollmentsStore from "../store/EnrollmentsStore.ts";
import useCoursesStore from "../store/CoursesStore.ts";
import useUsersStore, {resultProps} from "../store/UsersStore.ts";

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

    const addEnrollment = useEnrollmentsStore(state => state.addEnrollment);
    const state = useUserStateStore(state => state.state);
    const isEnrollmentIdNotExists = useEnrollmentsStore(state => state.isEnrollmentIdNotExists);
    const isCourseIdExists = useCoursesStore(state => state.isCourseIdExists);
    const isUserIdExists = useUsersStore(state => state.isUserIdExists);
    const users = useUsersStore(state => state.users);
    const courses = useCoursesStore(state => state.courses);

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


    function checkInputs(id: string, userId: string, courseId: string) : boolean {
        const idCheckResult = isEnrollmentIdNotExists(id);
        const userIdCheckResult = isUserIdExists(userId);
        const courseIdCheckResult = isCourseIdExists(courseId);

        if (courseIdCheckResult.succeeded && idCheckResult.succeeded && userIdCheckResult.succeeded) {
            return true;
        }
        setTextFieldsError({
            id: idCheckResult,
            userId: userIdCheckResult,
            courseId: courseIdCheckResult
        })

        return false;
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

        if (checkInputs(data.id, data.userId, data.courseId)) {
            addEnrollment(data);
            setAlertState({open: true, succeeded: true, message: "Enrollment added successfully!"});
            onClose();
        } else {
            setAlertState({open: true, succeeded: false, message: "Could not add enrollment"});
        }

    }

    const userIdOptions = users.map(user => user.id);
    const courseIdOptions = courses.map(course => course.id);

    return (

        <>

            <Dialog fullWidth open={open} onClose={onClose}>
                <form className="center-col" onSubmit={submitHandler}>

                    <TextField
                        name="id"
                        label="Enrollment ID"
                        variant="outlined"
                        required
                        error={!textFieldsError.id.succeeded}
                        helperText={textFieldsError.id.message}
                    />

                    <Autocomplete
                        disablePortal
                        options={userIdOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField
                            {...params}
                            name="userId"
                            label="User ID"
                            variant="outlined"
                            required
                            error={!textFieldsError.userId.succeeded}
                            helperText={textFieldsError.userId.message}
                        />}
                    />

                    <Autocomplete
                        disablePortal
                        options={courseIdOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField
                            {...params}
                            name="courseId"
                            label="Course ID"
                            variant="outlined"
                            required
                            error={!textFieldsError.courseId.succeeded}
                            helperText={textFieldsError.courseId.message}
                        />}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Created Date"
                                value={value}
                                onChange={(newDate) => newDate && setValue(newDate)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </div>

                </form>
            </Dialog>
        </>

    )
}