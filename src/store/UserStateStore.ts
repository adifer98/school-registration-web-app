import {create} from "zustand";


interface stateProps {
    userId: string;
    userRole: "Admin" | "Student";
}

interface UserStateProps {
    state: stateProps;
    setState: (state: stateProps) => void;
}



const useUserStateStore = create<UserStateProps>((set) => ({
    state: {
        userId: "1",
        userRole: "Student"
    },
    setState: (state) => set(S => ({...S, state}))
}));

export default useUserStateStore;