import User from "../interfaces/User.ts";
import {Dialog} from "@mui/material";
import UserForm from "./UserForm.tsx";
import {useState} from "react";
import useManagementStore from "../store/ManagementStore.ts";
import useAuthStore from "../store/AuthStore.ts";


interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

export default function UserModal(props: UserModalProps) {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const deleteUser = useManagementStore(state => state.deleteUser);
    const deleteApproval = useAuthStore(state => state.deleteApproval);

    const {user, onClose} = props;

    function deleteHandler() {
        deleteUser(user!.id);
        deleteApproval(user!.email);
        onClose();
        setOnDelete(false);
    }

    function closeHandler() {
        onClose();
        setOnDelete(false);
    }

    return (
        <>
            <UserForm
                method='UPDATE'
                user={user}
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    closeHandler();
                }}
            />

            <Dialog fullWidth open={user !== null && !openForm} onClose={closeHandler}>
                { user && (
                    <>
                        <h2> {user.name} </h2>

                        <div>
                            <p>{user.id}</p>
                            <p>{user.email}</p>
                            <p>{user.city}</p>
                            <p>{user.role}</p>
                            <p>{user.registrationDate.toLocaleDateString()}</p>
                        </div>
                    </>
                    )
                }


                {!onDelete &&
                    <div>
                        <button onClick={() => setOpenForm(true)}>Edit</button>
                        <button onClick={() => setOnDelete(true)}>Delete</button>
                    </div>
                }

                {onDelete &&
                    <>
                        <h3>Are you sure?</h3>
                        <div>
                            <button onClick={() => setOnDelete(false)}>No</button>
                            <button onClick={deleteHandler}>Yes</button>
                        </div>
                    </>

                }
            </Dialog>
        </>
    )

}