import Course from "../interfaces/Course.ts";


interface CourseFormProps {
    method: 'ADD' | 'UPDATE';
    student?: Course;
}

export default function CourseForm(props: CourseFormProps) {
    return (
        <form>
            <p>
                <label htmlFor="course-id">Course Id:</label>
                <input type="text" name="id" id="course-id"/>
            </p>
            <p>
                <label htmlFor="course-title">Title</label>
                <input id="course-title" name="title" type="text"/>
            </p>
            <p>
                <label htmlFor="course-description">Description</label>
                <input id="course-description" name="description" type="text"/>
            </p>
            <p>
                <label htmlFor="course-hours">Length in hours</label>
                <input id="course-hours" name="hours" type="number"/>
            </p>
            <p>
                <label htmlFor="course-price">Price</label>
                <input id="course-price" name="price" type="number"/>
            </p>
        </form>
    )
}