import {create} from "zustand";
import User from "../interfaces/User.ts";
import Course from "../interfaces/Course.ts";
import Enrollment from "../interfaces/Enrollment.ts";


interface resultProps {
    succeeded: boolean;
    message: string;
}

interface StoreProps {
    users: User[];
    addUser: (user: User) => resultProps;
    updateUser: (user: User) => resultProps;
    deleteUser: (userId: string) => resultProps;
    courses: Course[];
    addCourse: (course: Course) => resultProps;
    updateCourse: (course: Course) => resultProps;
    deleteCourse: (courseId: string) => resultProps;
    enrollments: Enrollment[];
    addEnrollment: (enrollment: Enrollment) => resultProps;
    deleteEnrollment: (enrollmentId: string) => resultProps;
}


const useManagementStore = create<StoreProps>((set) => ({
    users: [],
    addUser: (user: User) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.users.findIndex((u: User) => u.id === user.id);
            if (index >= 0) {
                message = `There's already a user with the id ${user.id}`;
                return {...state};
            }
            if (!user.email.includes('@')) {
                message = 'invalid email address';
                return {...state};
            }
            message = 'User added successfully!';
            succeeded = true;
            return {...state, users: [...state.users, student]}
        });
        return {succeeded, message};
    },
    updateUser: (user: User) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.users.findIndex((u: User) => u.id === user.id);
            if (index < 0) {
                message = `There's no user with the id ${user.id}`;
                return {...state};
            }
            if (!user.email.includes('@')) {
                message = 'invalid email address';
                return {...state};
            }
            state.users.splice(index, 1);
            message = 'User updated successfully!';
            succeeded = true;
            return {...state, users: [...state.users, user]};
        })
        return {succeeded, message};
    },
    deleteUser: (userId: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.users.findIndex((u: User) => u.id === userId);
            if (index < 0) {
                message = `There's no student with the id ${userId}`;
                return {...state};
            }
            state.users.splice(index, 1);
            const updatedEnrollments = state.enrollments.filter(enrollment => enrollment.userId !== userId);
            message = 'User deleted successfully!';
            succeeded = true;

            return {...state, enrollments: updatedEnrollments}
        })

        return {succeeded, message};
    },
    courses: [],
    addCourse: (course: Course) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === course.id);
            if (index >= 0) {
                message = `There's already a course with the id ${course.id}`;
                return {...state};
            }
            if (course.hours < 0 || course.price < 0) {
                message = 'invalid hours or price';
                return {...state};
            }
            message = 'Course added successfully!';
            succeeded = true;
            return {...state, courses: [...state.courses, course]};
        })
        return {succeeded, message};
    },
    updateCourse: (course: Course) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === course.id);
            if (index < 0) {
                message = `There's no course with the id ${course.id}`;
                return {...state};
            }

            if (course.hours < 0 || course.price < 0) {
               message = 'invalid hours or price';
                return {...state};
            }

            state.courses.splice(index, 1);

            message = 'Course updated successfully!';
            succeeded = true;
            return {...state, courses: [...state.courses, course]};
        });
        return {succeeded, message};
    },
    deleteCourse: (courseId: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === courseId);
            if (index < 0) {
               message = `There's no course with the id ${courseId}`;
                return {...state};
            }
            state.courses.splice(index, 1);

            const updatedEnrollments = state.enrollments.filter(enrollment => enrollment.courseId !== courseId);
            message = 'Course deleted successfully!';
            succeeded = true;

            return {...state, enrollments: updatedEnrollments};
        })
        return {succeeded, message};
    },
    enrollments: [],
    addEnrollment: (enrollment: Enrollment) => {
        let message: string = "";
        let succeeded: boolean = false;
        set(state => {
            const enrollmentIndex = state.enrollments.findIndex((e: Enrollment) => e.id === enrollment.id);
            if (enrollmentIndex >= 0) {
                message = `There's already an enrollment with the id ${enrollment.id}`;
                return {...state}
            }
            const studentIndex = state.users.findIndex((u: User) => u.id === enrollment.userId);
            const courseIndex = state.courses.findIndex((c: Course) => c.id === enrollment.courseId);

            if (studentIndex < 0 || courseIndex < 0) {
                message = `There is no user with the id ${enrollment.userId} or that there is no course with the id ${enrollment.courseId}`;
                return {...state}
            }
            message = 'Enrollment added successfully!';
            succeeded = true;
            return {...state, enrollments: [...state.enrollments, enrollment]};
        })
        return {succeeded, message};
    },
    deleteEnrollment: enrollmentId => {
        let message: string = "";
        let succeeded: boolean = false;
        set(state => {
            const enrollmentIndex = state.enrollments.findIndex((e: Enrollment) => e.id === enrollmentId);
            if (enrollmentIndex < 0) {
                message = `There's no enrollment with the id ${enrollmentId}`;
                return {...state}
            }
            state.enrollments.splice(enrollmentIndex, 1);
            message = 'Enrollment deleted successfully!';
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
    },
}));


export default useManagementStore;