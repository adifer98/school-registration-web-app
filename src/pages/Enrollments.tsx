import useStore from "../store/Store.ts";

export default function Enrollments() {
    const enrollments = useStore(state => state.enrollments);

    return (
        <>
            <h1>Enrollments Table:</h1>
            <div>
                <button>Add Enrollment</button>
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
                    <tr key={enrollment.id} onClick={() => console.log(enrollment)}>
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