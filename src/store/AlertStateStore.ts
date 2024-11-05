import {create} from "zustand";

interface ResultProps {
    open: boolean;
    succeeded: boolean;
    message: string;
}


interface AlertStateProps {
    open: boolean;
    succeeded: boolean;
    message: string;
    setAlertState: (resultProps: ResultProps) => void;
}


const useAlertState = create<AlertStateProps>((set) => ({
    open: false,
    succeeded: false,
    message: "",
    setAlertState: (resultProps: ResultProps) => {
        set(state => ({...state, ...resultProps}));
    }
}));

export default useAlertState;