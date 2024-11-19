import {create} from "zustand";
import {APPROVALS} from "../consts.ts";

interface resultProps {
    succeeded: boolean;
    message: string;
}

export interface ApprovalProps {
    email: string;
    password: string;
}

interface AuthStoreProps {
    userApprovals: ApprovalProps[];
    addApproval: (approval: ApprovalProps, confirmationPassword: string) => resultProps;
    deleteApproval: (email: string) => void;
    checkApproval: (approval: ApprovalProps) => resultProps;
    isEmailExists: (email: string) => resultProps;
    isEmailNotExist: (email: string) => resultProps;
    isPasswordCorrect: (email: string, password: string) => resultProps;
    isPasswordConfirm: (password: string, confirmationPassword: string) => resultProps;
    updateEmail: (oldEmail: string, newEmail: string) => void;
}



const useAuthStore = create<AuthStoreProps>((set) => ({
    userApprovals: APPROVALS,
    addApproval: (approval, confirmationPassword) => {
        let message = "Could not create an account";
        let succeeded = false;
        set(state => {
            const index = state.userApprovals.findIndex((a) => approval.email === a.email);
            if (index >= 0) {
                return {...state};
            }
            if (approval.password !== confirmationPassword) {
                return {...state}
            }
            succeeded = true;
            message = "Account created successfully!"
            return {...state, userApprovals: [...state.userApprovals, approval]};
        })
        return {succeeded, message};
    },
    deleteApproval: (email: string) => {
        set(state => {
            const index = state.userApprovals.findIndex((approval) => approval.email === email);
            if (index >= 0) {
                state.userApprovals.splice(index, 1);
            }
            return {...state};
        })
    },
    checkApproval: (approval: ApprovalProps) => {
        let message = "Log in failed";
        let succeeded = false;
        set(state => {
            const index = state.userApprovals.findIndex((a) => approval.email === a.email);
            if (index < 0 || approval.password !== state.userApprovals[index].password) {
                return {...state};
            }
            succeeded = true;
            message = "You’ve successfully accessed your account!"
            return {...state};
        })
        return {succeeded, message};
    },
    isEmailNotExist: (email: string) => {
        let message = "";
        let succeeded = false;
        set(state => {
            const index = state.userApprovals.findIndex((approval) => approval.email === email);
            if (index >= 0) {
                message = "That email belongs to a different account"
                return {...state};
            }
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
    isEmailExists: (email: string) => {
        let message = "";
        let succeeded = false;
        set(state => {
            const index = state.userApprovals.findIndex((approval) => approval.email === email);
            if (index < 0) {
                message = "There's no account with this email"
                return {...state};
            }
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
    isPasswordCorrect: (email: string, password: string) => {
        let message = "";
        let succeeded = false;
        set(state => {
            const index = state.userApprovals.findIndex((approval) => approval.email === email);
            if (index >= 0 && state.userApprovals[index].password !== password) {
                message = "Incorrect password"
                return {...state};
            }
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
    isPasswordConfirm: (password, confirmationPassword) => {
        if (password === confirmationPassword) {
            return {
                succeeded: true,
                message: ""
            }
        }
        return {
            succeeded: false,
            message: "Passwords do not match"
        };
    },
    updateEmail: (oldEmail: string, newEmail: string) => {
        set(state => {
            const index = state.userApprovals.findIndex(approval => approval.email === oldEmail);
            if (index >= 0) {
                state.userApprovals[index].email = newEmail;
            }
            return {...state};
        })
    }
}));

export default useAuthStore;