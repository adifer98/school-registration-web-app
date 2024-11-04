import Enrollment from "../interfaces/Enrollment.ts";

export default function EnrollmentPresenter(enrollment : Enrollment) {
    function editHandler() {}

    function deleteHandler() {}

    return (
        <>
            <h2> {enrollment.id}</h2>

            <div>
                <p>{enrollment.studentId}</p>
                <p>{enrollment.courseId}</p>
                <p>{enrollment.createdDate.toLocaleDateString()}</p>
            </div>

            <div>
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </>
    )

}