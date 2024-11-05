import {Alert, Snackbar} from "@mui/material";
import useAlertState from "../store/AlertStateStore.ts";



export default function AlertMessage() {

    const alertState = useAlertState(state => state);

    function handleCloseAlert() {
        alertState.setAlertState({...alertState, open: false});
    }

    return (
        <Snackbar open={alertState.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert
                onClose={handleCloseAlert}
                severity={alertState.succeeded ? "success" : "error"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alertState.message}
            </Alert>
        </Snackbar>
    )
}