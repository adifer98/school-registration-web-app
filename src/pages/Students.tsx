import {Suspense, useState} from "react";
import StudentForm from "../components/StudentForm.tsx";
import StudentModal from "../components/StudentModal.tsx";
import Student from "../interfaces/Student.ts";
import useManagementStore from "../store/ManagementStore.ts";
import {Button, CircularProgress, List, ListItem, ListItemText} from "@mui/material";
import {Await, useLoaderData, useNavigation} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


export default function Students() {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [searchInput, setSearchInput] = useState("");

    const students = useManagementStore((state) => state.students);

    const loaderData = useLoaderData();
    const navigation = useNavigation();

    console.log(navigation.state);

    const filterStudents : Student[] = students.filter(student =>
        student.name.toLowerCase().includes(searchInput.toLowerCase())
    )

    return (
        <>
            <StudentForm method="ADD" student={null} open={openForm} onClose={() => setOpenForm(false)} />
            <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />

            <div className="list-container">
                <h1>Students List:</h1>
                <div className="search-wrapper">
                    <SearchIcon className="search-icon" />
                    <input
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                <Button variant="contained" onClick={() => setOpenForm(true)}>
                    Add Student
                </Button>

                <Suspense fallback={<CircularProgress />}>
                    <Await resolve={loaderData}>
                        <List sx={{ width: "100%", maxWidth: 360 }}>
                            {filterStudents.map((student) => (
                                <div key={student.id} className="list-item" onClick={() => setSelectedStudent(student)}>
                                    <ListItem>
                                        <ListItemText primary={student.name} secondary={student.id} />
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </Await>
                </Suspense>

            </div>
        </>
    );
}


export async function studentsLoader() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Data is loaded" });
        }, 2000);
    });
}