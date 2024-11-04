import Course from "../interfaces/Course.ts";

export default function CoursePresenter(course: Course) {

    function editHandler() {}

    function deleteHandler() {}

    return (
        <>
            <h2> {course.title}</h2>

            <div>
                <p>{course.id}</p>
                <p>{course.description}</p>
                <p>{course.hours}</p>
                <p>{course.price}</p>
            </div>

            <div>
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </>
    )

}