import Student from "../interfaces/Student.ts";
import {Dialog} from "@mui/material";
import StudentForm from "./StudentForm.tsx";
import {useState} from "react";
import useManagementStore from "../store/ManagementStore.ts";


interface StudentPresenterProps {
    student: Student | null;
    onClose: () => void;
}

export default function StudentModal(props: StudentPresenterProps) {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const deleteStudent = useManagementStore(state => state.deleteStudent);

    const {student, onClose} = props;

    function deleteHandler() {
        deleteStudent(student!.id);
        onClose();
        setOnDelete(false);
    }

    function closeHandler() {
        onClose();
        setOnDelete(false);
    }

    return (
        <>
            <StudentForm
                method={'UPDATE'}
                student={student}
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    closeHandler();
                }}
            />

            <Dialog open={student !== null && !openForm} onClose={closeHandler}>
                { student && (
                    <>
                        <h2> {student.name} </h2>

                        <div>
                            <p>{student.id}</p>
                            <p>{student.email}</p>
                            <p>{student.city}</p>
                            <p>{student.registrationDate.toLocaleDateString()}</p>
                        </div>
                    </>
                    )
                }


                {!onDelete &&
                    <div>
                        <button onClick={() => setOpenForm(true)}>Edit</button>
                        <button onClick={() => setOnDelete(true)}>Delete</button>
                    </div>
                }

                {onDelete &&
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