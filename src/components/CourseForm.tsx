import Course from "../interfaces/Course.ts";
import {Button, Dialog, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import useAlertState from "../store/AlertStateStore.ts";
import useCoursesStore from "../store/CoursesStore.ts";
import {resultProps} from "../store/UsersStore.ts";


interface TextFieldsErrorProps {
    id: resultProps;
    hours: resultProps;
    price: resultProps;
}

interface CourseFormProps {
    method: 'ADD' | 'UPDATE';
    course: Course | null;
    open: boolean;
    onClose: () => void;
}

export default function CourseForm(props: CourseFormProps) {

    const [textFieldsError, setTextFieldsError] = useState<TextFieldsErrorProps>({
        id: {
            succeeded: true,
            message: ""
        },
        hours: {
            succeeded: true,
            message: ""
        },
        price: {
            succeeded: true,
            message: ""
        }
    })

    const setAlertState = useAlertState(state => state.setAlertState);
    const addCourse = useCoursesStore(state => state.addCourse);
    const updateCourse = useCoursesStore(state => state.updateCourse);
    const isCourseIdNotExists = useCoursesStore(state => state.isCourseIdNotExists);
    const isCourseHoursValid = useCoursesStore(state => state.isCourseHoursValid)
    const isCoursePriceValid = useCoursesStore(state => state.isCoursePriceValid)

    useEffect(() => {
        setTextFieldsError({
            id: {
                succeeded: true,
                message: ""
            },
            hours: {
                succeeded: true,
                message: ""
            },
            price: {
                succeeded: true,
                message: ""
            }
        })
    }, [props.course, setTextFieldsError])

    const {method, course, open, onClose} = props;

    function checkErrors(id: string, hours: number, price: number) {
        const idCheckResult = isCourseIdNotExists(id);
        const hoursCheckResult = isCourseHoursValid(hours);
        const priceCheckResult = isCoursePriceValid(price);
        setTextFieldsError({
            id: idCheckResult,
            hours: hoursCheckResult,
            price: priceCheckResult
        })
    }

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: Course = {
            id: formData.get("id") as string,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            hours: Number(formData.get("hours")),
            price: Number(formData.get("price")),
        };

        if (course !== null) {
            data.id = course.id;
        }

        console.log(data);

        if (method === "ADD") {
            const state = addCourse(data);
            setAlertState({...state, open: true});
            if (state.succeeded) {
                onClose();
            } else {
                checkErrors(data.id, data.hours, data.price);
            }
        } else {
            const state = updateCourse(data);
            setAlertState({...state, open: true});
            if (state.succeeded) {
                onClose();
            } else {
                checkErrors(data.id, data.hours, data.price);
            }
        }

    }


    return (

        <>

            <Dialog fullWidth open={open} onClose={onClose}>

                <form className="center-col" onSubmit={submitHandler}>

                        <TextField
                            name="id"
                            label="Course ID"
                            variant="outlined"
                            defaultValue={course ? course.id : ""}
                            required
                            disabled={course !== null}
                            error={course === null && !textFieldsError.id.succeeded}
                            helperText={course === null ? textFieldsError.id.message : ""}
                        />

                        <TextField
                            name="title"
                            label="Title"
                            variant="outlined"
                            defaultValue={course ? course.title : ""}
                            required
                        />

                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            defaultValue={course ? course.description : ""}
                            required
                            multiline
                        />

                        <TextField
                            name="hours"
                            label="Hours"
                            variant="outlined"
                            defaultValue={course ? course.hours : null}
                            required
                            error={!textFieldsError.hours.succeeded}
                            helperText={textFieldsError.hours.message}
                        />

                        <TextField
                            name="price"
                            label="Price"
                            variant="outlined"
                            defaultValue={course ? course.price : null}
                            required
                            error={!textFieldsError.price.succeeded}
                            helperText={textFieldsError.price.message}
                        />

                        <Button type="submit" variant="contained">Submit</Button>

                </form>
            </Dialog>
        </>

    )
}