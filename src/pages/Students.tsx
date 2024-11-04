import useStore from "../store/Store.ts";
import {useState} from "react";
import StudentForm from "../components/StudentForm.tsx";
import {Button} from "@mui/material";

export default function Students() {

    const [openForm, setOpenForm] = useState<boolean>(false);

    const students = useStore(state => state.students);


    return (
    <>
        <StudentForm method={'ADD'} student={null} open={openForm} onClose={() => setOpenForm(false)} />

        <h1>Students Table:</h1>
        <div>
            <Button onClick={() => setOpenForm(true)}>Add Student</Button>
        </div>
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Registration Date</th>
                </tr>
                {students.map(student => (
                    <tr key={student.id} onClick={() => console.log(student)}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.city}</td>
                        <td>{student.registrationDate.toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    );
}