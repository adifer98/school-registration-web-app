import Enrollment from "../interfaces/Enrollment.ts";
import {Dialog} from "@mui/material";
import {useState} from "react";
import useManagementStore from "../store/ManagementStore.ts";


interface EnrollmentPresenterProps {
    enrollment: Enrollment | null;
    onClose: () => void;
}

export default function EnrollmentModal(props: EnrollmentPresenterProps) {

    const [onDelete, setOnDelete] = useState<boolean>(false);

    const deleteEnrollment = useManagementStore(state => state.deleteEnrollment);

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
            <Dialog open={enrollment !== null} onClose={closeHandler}>
                { enrollment &&
                    <>
                        <h2> {enrollment.id}</h2>

                        <div>
                            <p>{enrollment.userId}</p>
                            <p>{enrollment.courseId}</p>
                            <p>{enrollment.createdDate.toLocaleDateString()}</p>
                        </div>
                    </>
                }

                {!onDelete &&
                    <div>
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