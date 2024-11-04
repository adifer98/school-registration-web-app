

export default function EnrollmentForm() {
    return (
        <form>
            <p>
                <label htmlFor="enrollment-id">Enrollment Id:</label>
                <input type="text" name="id" id="course-id"/>
            </p>
            <p>
                <label htmlFor="enrollment-student-id">Student Id</label>
                <input id="enrollment-student-if" name="studentId" type="text"/>
            </p>
            <p>
                <label htmlFor="enrollment-course-id">Course Id</label>
                <input id="enrollment-course-id" name="courseId" type="text"/>
            </p>
            <p>
                <label htmlFor="enrollment-created-date">Created Date</label>
                <input id="enrollment-created-date" name="createdDate" type="date"/>
            </p>
        </form>
    )
}