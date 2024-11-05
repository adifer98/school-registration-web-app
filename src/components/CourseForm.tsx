import Course from "../interfaces/Course.ts";
import {Button, Dialog, TextField} from "@mui/material";
import React from "react";
import useManagementStore from "../store/ManagementStore.ts";
import useAlertState from "../store/AlertStateStore.ts";



interface CourseFormProps {
    method: 'ADD' | 'UPDATE';
    course: Course | null;
    open: boolean;
    onClose: () => void;
}

export default function CourseForm(props: CourseFormProps) {

    const setAlertState = useAlertState(state => state.setAlertState);

    const addCourse = useManagementStore(state => state.addCourse);
    const updateCourse = useManagementStore(state => state.updateCourse);

    const {method, course, open, onClose} = props;

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


        console.log(data);
        if (method === "ADD") {
            setAlertState({...addCourse(data), open: true});
        } else {
            setAlertState({...updateCourse(data), open: true});
        }

        onClose();
    }


    return (

        <>

            <Dialog open={open} onClose={onClose}>

                <form onSubmit={submitHandler}>
                    <p>
                        <TextField
                            name="id"
                            label="Course ID"
                            variant="outlined"
                            defaultValue={course ? course.id : ""}
                            required
                            disabled={course !== null}
                        />
                    </p>
                    <p>
                        <TextField
                            name="title"
                            label="Title"
                            variant="outlined"
                            defaultValue={course ? course.title : ""}
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            defaultValue={course ? course.description : ""}
                            required
                            multiline
                        />
                    </p>
                    <p>
                        <TextField
                            name="hours"
                            label="Hours"
                            variant="outlined"
                            defaultValue={course ? course.hours : null}
                            required
                        />
                    </p>
                    <p>
                        <TextField
                            name="price"
                            label="Price"
                            variant="outlined"
                            defaultValue={course ? course.price : null}
                            required
                        />
                    </p>

                    <p>
                        <Button type="button" onClick={onClose}>Exit</Button>
                        <Button type="submit" variant="contained">Submit</Button>
                    </p>
                </form>
            </Dialog>
        </>

    )
}