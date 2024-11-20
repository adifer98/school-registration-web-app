import Course from "../interfaces/Course.ts";
import {Button, Dialog} from "@mui/material";
import {useState} from "react";
import CourseForm from "./CourseForm.tsx";
import useManagementStore from "../store/ManagementStore.ts";
import useUserStateStore from "../store/UserStateStore.ts";


interface CoursePresenterProps {
    course: Course | null;
    onClose: () => void;
}

export default function CourseModal(props: CoursePresenterProps) {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const deleteCourse = useManagementStore(state => state.deleteCourse);
    const state = useUserStateStore(state => state.state);

    const {course, onClose} = props;

    function deleteHandler() {
        deleteCourse(course!.id);
        onClose();
        setOnDelete(false);
    }

    function closeHandler() {
        onClose();
        setOnDelete(false);
    }

    return (
        <>
            <CourseForm
                method={'UPDATE'}
                course={course}
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    closeHandler();
                }}
            />

            <Dialog fullWidth open={course !== null && !openForm} onClose={closeHandler}>
                {course &&
                    <div className="center-col">
                        <h2>{course.title}</h2>

                        <div className="input-values">
                            <p>ID: {course.id}</p>
                            <p>Description: {course.description}</p>
                            <p>Hours: {course.hours}</p>
                            <p>Price: {course.price}</p>
                        </div>
                    </div>
                }

                {state.userRole === "Admin" && !onDelete &&
                    <div className="buttons-wrapper">
                        <Button variant="contained" color="secondary" onClick={() => setOpenForm(true)}>Edit</Button>
                        <Button variant="contained" color="primary" onClick={() => setOnDelete(true)}>Delete</Button>
                    </div>
                }

                {state.userRole === "Admin" && onDelete &&
                    <>
                        <h3>Are you sure?</h3>
                        <div className="buttons-wrapper">
                            <Button variant="contained" color="secondary" onClick={() => setOnDelete(false)}>No</Button>
                            <Button variant="contained" color="primary" onClick={deleteHandler}>Yes</Button>
                        </div>
                    </>
                }
            </Dialog>

        </>
    )

}