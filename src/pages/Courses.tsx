import CourseForm from "../components/CourseForm.tsx";
import useManagementStore from "../store/ManagementStore.ts";
import {useState} from "react";
import Course from "../interfaces/Course.ts";
import CourseModal from "../components/CourseModal.tsx";

export default function Courses() {

    const [courseSelected, setCourseSelected] = useState<Course | null>(null);
    const [openForm, setOpenForm] = useState<boolean>(false);

    const courses = useManagementStore(state => state.courses);


    return (
        <>
            <CourseForm method={'ADD'} course={null} open={openForm} onClose={() => setOpenForm(false)} />

            <CourseModal course={courseSelected} onClose={() => setCourseSelected(null)} />

            <h1>Courses Table:</h1>
            <div>
                <button onClick={() => setOpenForm(true)}>Add Course</button>
            </div>
            <table>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Hours</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
                {courses.map(course => (
                    <tr key={course.id} onClick={() => setCourseSelected(course)}>
                        <td>{course.id}</td>
                        <td>{course.title}</td>
                        <td>{course.hours}</td>
                        <td>{course.price}</td>
                        <td>{course.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}