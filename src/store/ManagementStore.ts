import {create} from "zustand";
import User from "../interfaces/User.ts";
import Course from "../interfaces/Course.ts";
import Enrollment from "../interfaces/Enrollment.ts";
import {COURSES, ENROLLMENTS, USERS} from "../consts.ts";

const emptyUser: User = {
    id: "",
    name: "",
    email: "",
    city: "",
    role: "Student",
    registrationDate: new Date()
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
    addUser: (user: User, emailCheck: (email:string) => resultProps) => resultProps;
    updateUser: (user: User, emailCheck: (email:string) => resultProps) => resultProps;
    deleteUser: (userId: string) => resultProps;
    getUserById: (id: string) => User;

    courses: Course[];
    isCourseIdExists: (id: string) => resultProps;
    isCourseIdNotExists: (id: string) => resultProps;
    isCourseHoursValid: (hours: number) => resultProps;
    isCoursePriceValid: (price: number) => resultProps;
    addCourse: (course: Course) => resultProps;
    updateCourse: (course: Course) => resultProps;
    deleteCourse: (courseId: string) => resultProps;

    enrollments: Enrollment[];
    isEnrollmentIdNotExists: (id: string) => resultProps;
    addEnrollment: (enrollment: Enrollment) => resultProps;
    deleteEnrollment: (enrollmentId: string) => resultProps;

    getStateByEmail: (email: string) => stateProps;
}


const useManagementStore = create<StoreProps>((set) => ({
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
    addUser: (user: User, emailCheck) => {
        let message : string = "Could not add new user";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.users.findIndex((u: User) => u.id === user.id);
            if (index >= 0) {
                return {...state};
            }
            if (!emailCheck(user.email).succeeded) {
                return {...state};
            }
            message = 'User added successfully!';
            succeeded = true;
            return {...state, users: [...state.users, user]}
        });
        return {succeeded, message};
    },
    updateUser: (user: User, emailCheck: (email:string) => resultProps) => {
        let message : string = "Could not update user";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.users.findIndex((u: User) => u.id === user.id);
            if (!emailCheck(user.email).succeeded) {
                return {...state};
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
            const updatedEnrollments = state.enrollments.filter(enrollment => enrollment.userId !== userId);
            message = 'User deleted successfully!';
            succeeded = true;

            return {...state, enrollments: updatedEnrollments}
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
    courses: COURSES,
    isCourseIdExists: (id: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set(state => {
            const index = state.courses.findIndex((course: Course) => course.id === id);
            if (index < 0) {
                message = `There's no course with the id ${id}`;
            } else {
                succeeded = true
            }
            return {...state};
        });
        return {succeeded, message};
    },
    isCourseIdNotExists: (id: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set(state => {
            const index = state.courses.findIndex((course: Course) => course.id === id);
            if (index >= 0) {
                message = `There's already a course with the id ${id}`;
            } else {
                succeeded = true
            }
            return {...state};
        });
        return {succeeded, message};
    },
    isCourseHoursValid: (hours: number) => {
        if (hours >= 0) {
            return {
                succeeded: true,
                message: ''
            }
        }
        return {
            succeeded: false,
            message: 'Invalid hours'
        }
    },
    isCoursePriceValid: (price: number) => {
        if (price >= 0) {
            return {
                succeeded: true,
                message: ''
            }
        }
        return {
            succeeded: false,
            message: 'Invalid price'
        }
    },
    addCourse: (course: Course) => {
        let message : string = "Could not add course";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === course.id);
            if (index >= 0) {
                return {...state};
            }
            if (!(course.hours >= 0) || !(course.price >= 0)) {
                return {...state};
            }
            message = 'Course added successfully!';
            succeeded = true;
            return {...state, courses: [...state.courses, course]};
        })
        return {succeeded, message};
    },
    updateCourse: (course: Course) => {
        let message : string = "Could not update course";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === course.id);
            if (index < 0) {
                return {...state};
            }

            if (!(course.hours >= 0) || !(course.price >= 0)) {
                return {...state};
            }

            state.courses[index] = course;
            message = 'Course updated successfully!';
            succeeded = true;
            return {...state};
        });
        return {succeeded, message};
    },
    deleteCourse: (courseId: string) => {
        let message : string = "Could not delete course";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === courseId);
            if (index < 0) {
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
    enrollments: ENROLLMENTS,
    isEnrollmentIdNotExists: (id: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set(state => {
            const index = state.enrollments.findIndex((enrollment: Enrollment) => enrollment.id === id);
            if (index >= 0) {
                message = `There's already an enrollment with the id ${id}`;
            } else {
                succeeded = true
            }
            return {...state};
        });
        return {succeeded, message};
    },
    addEnrollment: (enrollment: Enrollment) => {
        let message: string = "Could not add an enrollment";
        let succeeded: boolean = false;
        set(state => {
            const enrollmentIndex = state.enrollments.findIndex((e: Enrollment) => e.id === enrollment.id);
            if (enrollmentIndex >= 0) {
                return {...state}
            }
            const studentIndex = state.users.findIndex((u: User) => u.id === enrollment.userId);
            const courseIndex = state.courses.findIndex((c: Course) => c.id === enrollment.courseId);

            if (studentIndex < 0 || courseIndex < 0) {
                return {...state}
            }
            message = 'Enrollment added successfully!';
            succeeded = true;
            return {...state, enrollments: [...state.enrollments, enrollment]};
        })
        return {succeeded, message};
    },
    deleteEnrollment: enrollmentId => {
        let message: string = "Could not delete enrollment";
        let succeeded: boolean = false;
        set(state => {
            const enrollmentIndex = state.enrollments.findIndex((e: Enrollment) => e.id === enrollmentId);
            if (enrollmentIndex < 0) {
                return {...state}
            }
            state.enrollments.splice(enrollmentIndex, 1);
            message = 'Enrollment deleted successfully!';
            succeeded = true;
            return {...state};
        })
        return {succeeded, message};
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


export default useManagementStore;