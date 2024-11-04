import useStore from "../store/Store.ts";

export default function Courses() {
    const courses = useStore(state => state.courses);


    return (
        <>
            <h1>Courses Table:</h1>
            <div>
                <button>Add Course</button>
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
                    <tr key={course.id} onClick={() => console.log(course)}>
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