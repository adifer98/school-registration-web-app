import EnrollmentForm from "../components/EnrollmentForm.tsx";
import EnrollmentModal from "../components/EnrollmentModal.tsx";
import useManagementStore from "../store/ManagementStore.ts";
import {useState} from "react";
import Enrollment from "../interfaces/Enrollment.ts";

export default function Enrollments() {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);


    const enrollments = useManagementStore(state => state.enrollments);

    return (
        <>
            <EnrollmentForm open={openForm} onClose={() => setOpenForm(false)} />

            <EnrollmentModal enrollment={selectedEnrollment} onClose={() => setSelectedEnrollment(null)}/>

            <h1>Enrollments Table:</h1>
            <div>
                <button onClick={() => setOpenForm(true)}>Add Enrollment</button>
            </div>
            <table>
                <tbody>
                <tr>
                    <th>Enrollment Id</th>
                    <th>Student's Id</th>
                    <th>Course Id</th>
                    <th>Price</th>
                    <th>Created Date</th>
                </tr>
                {enrollments.map(enrollment => (
                    <tr key={enrollment.id} onClick={() => setSelectedEnrollment(enrollment)}>
                        <td>{enrollment.id}</td>
                        <td>{enrollment.studentId}</td>
                        <td>{enrollment.courseId}</td>
                        <td>{enrollment.createdDate.toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}