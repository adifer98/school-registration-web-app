import CourseForm from "../components/CourseForm.tsx";
import {useEffect, useState} from "react";
import Course from "../interfaces/Course.ts";
import CourseModal from "../components/CourseModal.tsx";
import {Button, CircularProgress, List, ListItem, ListItemText} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useUserStateStore from "../store/UserStateStore.ts";
import useCoursesStore from "../store/CoursesStore.ts";

export default function Courses() {

    const [courseSelected, setCourseSelected] = useState<Course | null>(null);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState("");

    const courses = useCoursesStore(state => state.courses);
    const state = useUserStateStore(state => state.state);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(()=> {
            setIsLoading(false);
        }, 1500);
    }, [])

    const filterCourses : Course[] = courses.filter(course =>
        course.title.toLowerCase().includes(searchInput.toLowerCase())
    )

    return (
        <>
            <CourseForm method={'ADD'} course={null} open={openForm} onClose={() => setOpenForm(false)}/>

            <CourseModal course={courseSelected} onClose={() => setCourseSelected(null)}/>
            <div className="list-container">

                <h1>Available Courses:</h1>

                <div className="search-wrapper">
                    <SearchIcon className="search-icon"/>
                    <input
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                {state.userRole === "Admin" &&
                    <Button variant="contained" onClick={() => setOpenForm(true)}>Add Course</Button>}

                {isLoading && <div style={{margin: "50px"}}><CircularProgress/></div>}

                {!isLoading &&
                    <List sx={{width: '100%', maxWidth: 360}}>
                        {filterCourses.map(course => (
                            <div className="list-item" key={course.id} onClick={() => setCourseSelected(course)}>
                                <ListItem>
                                    <ListItemText primary={course.title} secondary={course.id}/>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                }
            </div>
        </>
    );
}