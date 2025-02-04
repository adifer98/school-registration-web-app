import {create} from "zustand";
import User from "../interfaces/User.ts";
import {USERS} from "../consts.ts";

const emptyUser: User = {
    id: "",
    name: "",
    email: "",
    city: "",
    role: "Student",
    registrationDate: new Date(),
    password: ""
}

export interface resultProps {
    succeeded: boolean;
    message: string;
}

interface stateProps {
    userId: string;
    userRole: "Admin" | "Student";
}

interface StoreProps {
    users: User[];
    isUserIdNotExists: (id: string) => resultProps;
    isUserIdExists: (id: string) => resultProps;
    isEmailExists: (email: string) => resultProps;
    isEmailNotExists: (email: string) => resultProps;
    isPasswordCorrect: (email: string, password: string) => resultProps;
    addUser: (user: User, confirmationPassword: string) => resultProps;
    updateUser: (user: User, confirmationPassword: string) => resultProps;
    deleteUser: (userId: string) => resultProps;
    getUserById: (id: string) => User;
    getStateByEmail: (email: string) => stateProps;
}


const useUsersStore = create<StoreProps>((set) => ({
    users: USERS,
    isUserIdNotExists: (id: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set(state => {
            const index = state.users.findIndex((user: User) => user.id === id);
            if (index >= 0) {
                message = `There's already a user with the id ${id}`;
            } else {
                succeeded = true
            }
            return {...state};
        });
        return {succeeded, message};
    },
    isUserIdExists: (id: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set(state => {
            const index = state.users.findIndex((user: User) => user.id === id);
            if (index < 0) {
                message = `There's no user with the id ${id}`;
            } else {
                succeeded = true
            }
            return {...state};
        });
        return {succeeded, message};
    },
    isEmailNotExists: (email: string) => {
        let message = "";
        let succeeded = false;
        set(state => {
            const index = state.users.findIndex((user) => user.email === email);
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
            const index = state.users.findIndex((user) => user.email === email);
            if (index < 0) {
                message = "There's no account with this email";
                return {...state};
            }
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
    isPasswordCorrect: (email: string, password: string) => {
        let message : string = "";
        let succeeded = false;
        set(state => {
            const index = state.users.findIndex((user) => user.email === email);
            if (index >= 0 && state.users[index].password !== password) {
                message = "Incorrect password"
                return {...state};
            }
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
    addUser: (user: User, confirmationPassword: string) => {
        let message : string = "Could not add new user";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            if (user.password !== confirmationPassword) {
                return {...state};
            }
            const index = state.users.findIndex((u: User) => u.id === user.id);
            if (index >= 0) {
                return {...state};
            }
            if (state.users.filter(u => u.email === user.email).length > 0) {
                return {...state};
            }
            message = 'User added successfully!';
            succeeded = true;
            return {...state, users: [...state.users, user]}
        });
        return {succeeded, message};
    },
    updateUser: (user: User, confirmationPassword: string) => {
        let message : string = "Could not update user";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            if (user.password !== confirmationPassword) {
                return {...state};
            }
            const index = state.users.findIndex((u: User) => u.id === user.id);
            if (state.users[index].email !== user.email) {
                if (state.users.filter((u: User) => u.email === user.email).length === 1) {
                    return {...state};
                }
            }
            state.users[index] = user;
            message = 'User updated successfully!';
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
    deleteUser: (userId: string) => {
        let message : string = "Could not delete the user";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.users.findIndex((u: User) => u.id === userId);
            if (index < 0) {
                return {...state};
            }
            state.users.splice(index, 1);
            message = 'User deleted successfully!';
            succeeded = true;

            return {...state}
        })

        return {succeeded, message};
    },
    getUserById: (id: string) => {
        let user: User = emptyUser;
        set(state => {
            const index = state.users.findIndex((u: User) => u.id === id);
            if (index >= 0) {
                user = {...state.users[index]};
            }
            return {...state};
        })
        return user;
    },
    getStateByEmail: (email: string) => {
        let userId = "";
        let userRole : 'Admin' | 'Student' = "Student"
        set(state => {
            const index = state.users.findIndex((e: User) => e.email === email);
            if (index >= 0) {
                userId = state.users[index].id;
                userRole = state.users[index].role;
            }
            return {...state};
        })
        return {userId, userRole};
    }
}));


export default useUsersStore;