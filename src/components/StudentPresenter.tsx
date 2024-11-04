import Student from "../interfaces/Student.ts";
import {Dialog} from "@mui/material";

interface StudentPresenterProps {
    student: Student;
    open: boolean;
    onClose: () => void;
}

export default function StudentPresenter(props: StudentPresenterProps) {

    const {student, open, onClose} = props;

    function editHandler() {}

    function deleteHandler() {}

    return (
        <Dialog open={open} onClose={onClose}>
            <h2> {student.name}</h2>

            <div>
                <p>{student.id}</p>
                <p>{student.email}</p>
                <p>{student.city}</p>
                <p>{student.registrationDate.toLocaleDateString()}</p>
            </div>

            <div>
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </Dialog>
    )

}