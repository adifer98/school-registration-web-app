import EnrollmentForm from "../components/EnrollmentForm.tsx";
import EnrollmentModal from "../components/EnrollmentModal.tsx";
import useManagementStore from "../store/ManagementStore.ts";
import {useState} from "react";
import Enrollment from "../interfaces/Enrollment.ts";
import {Button, List, ListItem, ListItemText, MenuItem, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Enrollments() {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
    const [searchInput, setSearchInput] = useState("");
    const [filteredValue, setFilteredValue] = useState<'Student' | 'Course'>('Student');

    const enrollments = useManagementStore(state => state.enrollments);

    const filteredEnrollments = enrollments.filter(enrollment => {
        if (filteredValue === 'Student') {
            return enrollment.userId.startsWith(searchInput);
        }
        return enrollment.courseId.startsWith(searchInput);
    })

    return (
        <>
            <EnrollmentForm open={openForm} onClose={() => setOpenForm(false)}/>

            <EnrollmentModal enrollment={selectedEnrollment} onClose={() => setSelectedEnrollment(null)}/>

            <div className="list-container">
                <h1>Enrollments Table:</h1>

                <div className="search-wrapper">
                    <SearchIcon className="search-icon"/>
                    <input
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <TextField
                        select
                        label="Filter by:"
                        value={filteredValue}
                    >
                        <MenuItem value={'Student'} onClick={() => setFilteredValue('Student')}>
                            Student
                        </MenuItem>
                        <MenuItem value='Course' onClick={() => setFilteredValue('Course')}>
                           Course
                        </MenuItem>
                    </TextField>
                </div>

                <Button variant="contained" onClick={() => setOpenForm(true)}>Add Enrollment</Button>

                <List sx={{width: '100%', maxWidth: 360}}>
                    {filteredEnrollments.map(enrollment => (
                        <div key={enrollment.id} className="list-item"
                             onClick={() => setSelectedEnrollment(enrollment)}>
                            <ListItem>
                                <ListItemText
                                    primary={enrollment.id}
                                    secondary={enrollment.createdDate.toLocaleDateString()}/>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </div>
        </>
    );
}