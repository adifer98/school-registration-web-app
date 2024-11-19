import Course from "../interfaces/Course.ts";
import {Dialog} from "@mui/material";
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

            <Dialog open={course !== null} onClose={closeHandler}>
                {course &&
                    <>
                        <h2> {course.title}</h2>

                        <div>
                            <p>{course.id}</p>
                            <p>{course.description}</p>
                            <p>{course.hours}</p>
                            <p>{course.price}</p>
                        </div>
                    </>
                }

                {state.userRole === "Admin" && !onDelete &&
                    <div>
                        <button onClick={() => setOpenForm(true)}>Edit</button>
                        <button onClick={() => setOnDelete(true)}>Delete</button>
                    </div>
                }

                {state.userRole === "Admin" && onDelete &&
                    <>
                        <h3>Are you sure?</h3>
                        <div>
                            <button onClick={() => setOnDelete(false)}>No</button>
                            <button onClick={deleteHandler}>Yes</button>
                        </div>
                    </>
                }
            </Dialog>

        </>
    )

}