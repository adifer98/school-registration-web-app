import {Suspense, useState} from "react";
import UserForm from "../components/UserForm.tsx";
import UserModal from "../components/UserModal.tsx";
import useManagementStore from "../store/ManagementStore.ts";
import {Button, CircularProgress, List, ListItem, ListItemText} from "@mui/material";
import {Await, useLoaderData, useNavigation} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import User from "../interfaces/User.ts";


export default function Users() {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchInput, setSearchInput] = useState("");

    const users = useManagementStore((state) => state.users);

    const loaderData = useLoaderData();
    const navigation = useNavigation();

    console.log(navigation.state);

    const filterUsers : User[] = users.filter(user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
    )

    return (
        <>
            <UserForm method="ADD" user={null} open={openForm} onClose={() => setOpenForm(false)} />
            <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />

            <div className="list-container">
                <h1>Users List:</h1>
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
                            {filterUsers.map((user) => (
                                <div key={user.id} className="list-item" onClick={() => setSelectedUser(user)}>
                                    <ListItem>
                                        <ListItemText primary={user.name} secondary={user.id} />
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


export async function usersLoader() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Data is loaded" });
        }, 2000);
    });
}