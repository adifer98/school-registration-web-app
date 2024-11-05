import {create} from "zustand";
import Student from "../interfaces/Student.ts";
import Course from "../interfaces/Course.ts";
import Enrollment from "../interfaces/Enrollment.ts";


interface resultProps {
    succeeded: boolean;
    message: string;
}

interface StoreProps {
    students: Student[];
    addStudent: (student: Student) => resultProps;
    updateStudent: (student: Student) => resultProps;
    deleteStudent: (studentId: string) => resultProps;
    courses: Course[];
    addCourse: (course: Course) => resultProps;
    updateCourse: (course: Course) => resultProps;
    deleteCourse: (courseId: string) => resultProps;
    enrollments: Enrollment[];
    addEnrollment: (enrollment: Enrollment) => resultProps;
    deleteEnrollment: (enrollmentId: string) => resultProps;
}


const useManagementStore = create<StoreProps>((set) => ({
    students: [],
    addStudent: (student: Student) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.students.findIndex((s: Student) => s.id === student.id);
            if (index >= 0) {
                message = `There's already a student with the id ${student.id}`;
                return {...state};
            }
            if (!student.email.includes('@')) {
                message = 'invalid email address';
                return {...state};
            }
            message = 'Student added successfully!';
            succeeded = true;
            return {...state, students: [...state.students, student]}
        });
        return {succeeded, message};
    },
    updateStudent: (student: Student) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.students.findIndex((s: Student) => s.id === student.id);
            if (index < 0) {
                message = `There's no student with the id ${student.id}`;
                return {...state};
            }
            if (!student.email.includes('@')) {
                message = 'invalid email address';
                return {...state};
            }
            state.students.splice(index, 1);
            message = 'Student updated successfully!';
            succeeded = true;
            return {...state, students: [...state.students, student]};
        })
        return {succeeded, message};
    },
    deleteStudent: (studentId: string) => {
        let message : string = "";
        let succeeded : boolean = false;
        set((state: StoreProps): StoreProps => {
            const index = state.students.findIndex((s: Student) => s.id === studentId);
            if (index < 0) {
                message = `There's no student with the id ${studentId}`;
                return {...state};
            }
            state.students.splice(index, 1);
            const updatedEnrollments = state.enrollments.filter(enrollment => enrollment.studentId !== studentId);
            message = 'Student deleted successfully!';
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
            const studentIndex = state.students.findIndex((s: Student) => s.id === enrollment.studentId);
            const courseIndex = state.courses.findIndex((c: Course) => c.id === enrollment.courseId);

            if (studentIndex < 0 || courseIndex < 0) {
                message = `There is no student with the id ${enrollment.studentId} or that there is no course with the id ${enrollment.courseId}`;
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