import {useState} from "react";
import StudentForm from "../components/StudentForm.tsx";
import StudentModal from "../components/StudentModal.tsx";
import Student from "../interfaces/Student.ts";
import useManagementStore from "../store/ManagementStore.ts";


export default function Students() {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const students = useManagementStore(state => state.students);

    return (
    <>
        <StudentForm method='ADD' student={null} open={openForm} onClose={() => setOpenForm(false)} />

        <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />

        <h1>Students Table:</h1>
        <div>
            <button onClick={() => setOpenForm(true)}>Add Student</button>
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
                    <tr key={student.id} onClick={() => setSelectedStudent(student)}>
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