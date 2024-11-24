import User from "../interfaces/User.ts";
import {Button, Dialog} from "@mui/material";
import UserForm from "./UserForm.tsx";
import {useState} from "react";
import useUserStateStore from "../store/UserStateStore.ts";
import useAlertState from "../store/AlertStateStore.ts";
import {useNavigate} from "react-router-dom";
import useUsersStore from "../store/UsersStore.ts";
import useEnrollmentsStore from "../store/EnrollmentsStore.ts";


interface userUpdateModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

function UserUpdateModal(props: userUpdateModalProps) {

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <UserForm method='UPDATE' onClose={props.onClose} user={props.user} />
        </Dialog>
    )
}


interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

export default function UserModal(props: UserModalProps) {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const deleteUser = useUsersStore(state => state.deleteUser);
    const state = useUserStateStore(state => state.state);
    const setAlertState = useAlertState(state => state.setAlertState);
    const deleteEnrollmentsByUserId = useEnrollmentsStore(state => state.deleteEnrollmentsByUserId);

    const navigate = useNavigate();

    const {user, onClose} = props;

    function deleteHandler() {
        if (user!.id === state.userId) {
            setAlertState({
                succeeded: false,
                message: "You've deleted your account... we're logging you out",
                open: true
            });
            navigate('/');
        } else {
            setAlertState({
                succeeded: true,
                message: "User deleted Successfully!",
                open: true
            });
        }
        deleteUser(user!.id);
        deleteEnrollmentsByUserId(user!.id);
        onClose();
        setOnDelete(false);
    }

    function closeHandler() {
        onClose();
        setOnDelete(false);
    }

    return (
        <>
            <UserUpdateModal
                user={user}
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    closeHandler();
                }}
            />

            <Dialog fullWidth open={user !== null && !openForm} onClose={closeHandler}>
                { user && (
                    <div className="center-col">
                        <h2>{user.name} </h2>

                        <div className="input-values">
                            <p>ID: {user.id}</p>
                            <p>Email: {user.email}</p>
                            <p>City: {user.city}</p>
                            <p>Role: {user.role}</p>
                            <p>Registration Date: {user.registrationDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                    )
                }


                {!onDelete &&
                    <div className="buttons-wrapper">
                        <Button variant="contained" color="secondary" onClick={() => setOpenForm(true)}>Edit</Button>
                        <Button variant="contained" color="primary" onClick={() => setOnDelete(true)}>Delete</Button>
                    </div>
                }

                {onDelete &&
                    <>
                        <h3 style={{margin: "0 1rem"}}>Are you sure?</h3>
                        <div className="buttons-wrapper">
                            <Button variant="contained" color="secondary" onClick={() => setOnDelete(false)}>No</Button>
                            <Button variant="contained" color="primary" onClick={deleteHandler}>Yes</Button>
                        </div>
                    </>
                }
            </Dialog>
        </>
    )

}