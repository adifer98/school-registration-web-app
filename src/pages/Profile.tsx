import useUserStateStore from "../store/UserStateStore.ts";
import {Button} from "@mui/material";
import UserModal from "../components/UserModal.tsx";
import {useState} from "react";
import useUsersStore from "../store/UsersStore.ts";


export default function Profile() {

    const [openModal, setOpenModal] = useState<boolean>(false);

    const state = useUserStateStore(state => state.state);
    const getUserById = useUsersStore(state => state.getUserById);

    const user = getUserById(state.userId);

    return (
        <>
            <UserModal user={openModal ? user : null} onClose={() => setOpenModal(false)} />

            <h1> Hello {user.name}! </h1>

            <Button variant="contained" onClick={() => setOpenModal(true)}>Watch your details</Button>
        </>
    )
}