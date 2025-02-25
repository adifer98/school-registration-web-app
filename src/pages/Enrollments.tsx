import EnrollmentForm from "../components/EnrollmentForm.tsx";
import EnrollmentModal from "../components/EnrollmentModal.tsx";
import {useEffect, useState} from "react";
import Enrollment from "../interfaces/Enrollment.ts";
import {Button, CircularProgress, List, ListItem, ListItemText, MenuItem, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useUserStateStore from "../store/UserStateStore.ts";
import useEnrollmentsStore from "../store/EnrollmentsStore.ts";

export default function Enrollments() {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
    const [searchInput, setSearchInput] = useState("");
    const [filteredValue, setFilteredValue] = useState<'Student' | 'Course'>('Student');

    const enrollments = useEnrollmentsStore(state => state.enrollments);
    const state = useUserStateStore(state => state.state);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(()=> {
            setIsLoading(false);
        }, 1500);
    }, [])

    const filteredEnrollments = enrollments.filter(enrollment => {
        if (state.userRole === "Admin") {
            if (filteredValue === 'Student') {
                return enrollment.userId.startsWith(searchInput);
            }
            return enrollment.courseId.startsWith(searchInput);
        }
        return enrollment.id.startsWith(searchInput) && enrollment.userId.startsWith(state.userId);
    })

    return (
        <>
            <EnrollmentForm open={openForm} onClose={() => setOpenForm(false)}/>

            <EnrollmentModal enrollment={selectedEnrollment} onClose={() => setSelectedEnrollment(null)}/>

            <div className="list-container">

                <h1>{state.userRole === "Admin" ? "Enrollments List:" : "Your Enrollments:"}</h1>

                <div className="search-wrapper">
                    <SearchIcon className="search-icon"/>
                    <input
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {state.userRole === "Admin" &&
                        <TextField
                            select
                            label="Filter by:"
                            value={filteredValue}
                        >
                            <MenuItem value='Student' onClick={() => setFilteredValue('Student')}>
                                Student
                            </MenuItem>
                            <MenuItem value='Course' onClick={() => setFilteredValue('Course')}>
                                Course
                            </MenuItem>
                        </TextField>
                    }
                </div>

                {state.userRole === 'Admin' &&
                    <Button variant="contained" onClick={() => setOpenForm(true)}>Add Enrollment</Button>
                }

                {isLoading && <div style={{margin: "50px"}}><CircularProgress/></div>}

                {!isLoading &&
                    <List sx={{width: '100%', maxWidth: 360}}>
                        {filteredEnrollments.map(enrollment => (
                            <div
                                key={enrollment.id}
                                className="list-item"
                                onClick={() => setSelectedEnrollment(enrollment)}
                            >
                                <ListItem>
                                    <ListItemText
                                        primary={enrollment.id}
                                        secondary={enrollment.createdDate.toLocaleDateString()}
                                    />
                                </ListItem>
                            </div>
                        ))}
                    </List>
                }
            </div>
        </>
    );
}