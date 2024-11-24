import Enrollment from "../interfaces/Enrollment.ts";
import {Button, Dialog} from "@mui/material";
import {useState} from "react";
import useEnrollmentsStore from "../store/EnrollmentsStore.ts";


interface EnrollmentPresenterProps {
    enrollment: Enrollment | null;
    onClose: () => void;
}

export default function EnrollmentModal(props: EnrollmentPresenterProps) {

    const [onDelete, setOnDelete] = useState<boolean>(false);

    const deleteEnrollment = useEnrollmentsStore(state => state.deleteEnrollmentById);

    const {enrollment, onClose} = props;

    function deleteHandler() {
        deleteEnrollment(enrollment!.id);
        onClose();
        setOnDelete(false);
    }

    function closeHandler() {
        onClose();
        setOnDelete(false);
    }

    return (
        <>
            <Dialog fullWidth open={enrollment !== null} onClose={closeHandler}>
                {enrollment &&
                    <div className="center-col">
                        <div className="input-values">
                            <p>Enrollment ID: {enrollment.id}</p>
                            <p>User ID: {enrollment.userId}</p>
                            <p>Course ID: {enrollment.courseId}</p>
                            <p>Created Date: {enrollment.createdDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                }

                {!onDelete &&
                    <div className="buttons-wrapper">
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