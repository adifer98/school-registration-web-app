import {create} from "zustand";
import Student from "../interfaces/Student.ts";
import Course from "../interfaces/Course.ts";
import Enrollment from "../interfaces/Enrollment.ts";


interface StoreProps {
    students: Student[];
    addStudent: (student: Student) => void;
    updateStudent: (student: Student) => void;
    deleteStudent: (studentId: string) => void;
    courses: Course[];
    addCourse: (course: Course) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (courseId: string) => void;
    enrollments: Enrollment[];
    addEnrollment: (enrollment: Enrollment) => void;
    deleteEnrollment: (enrollmentId: string) => void;
}


const useStore = create<StoreProps>((set) => ({
    students: [],
    addStudent: (student: Student) => {
        set((state: StoreProps): StoreProps => {
            const index = state.students.findIndex((s: Student) => s.id === student.id);
            if (index >= 0) {
                console.log(`There's already a student with the id ${student.id}`);
                return {...state};
            }
            if (!student.email.includes('@')) {
                console.log('invalid email address');
                return {...state};
            }
            return {...state, students: [...state.students, student]}
        });
    },
    updateStudent: (student: Student) => {
        if (!student.email.includes('@')) {
            console.log('invalid email address');
            return;
        }
        set((state: StoreProps): StoreProps => {
            const index = state.students.findIndex((s: Student) => s.id === student.id);
            if (index < 0) {
                console.log(`There's no student with the id ${student.id}`);
                return {...state};
            }
            state.students.splice(index, 1);
            return {...state, students: [...state.students, student]};
        })
    },
    deleteStudent: (studentId: string) => {
        set((state: StoreProps): StoreProps => {
            const index = state.students.findIndex((s: Student) => s.id === studentId);
            if (index < 0) {
                console.log(`There's no student with the id ${studentId}`);
                return {...state};
            }
            state.students.splice(index, 1);
            return {...state}
        })
    },
    courses: [],
    addCourse: (course: Course) => {
        set((state: StoreProps): StoreProps => {
            if (course.hours < 0 || course.price < 0) {
                console.log('invalid hours or price');
                return {...state};
            }
            return {...state, courses: [...state.courses, course]}
        })
    },
    updateCourse: (course: Course) => {
        set((state: StoreProps): StoreProps => {
            if (course.hours < 0 || course.price < 0) {
                console.log('invalid hours or price');
                return {...state};
            }
            const index = state.courses.findIndex((c: Course) => c.id === course.id);
            if (index < 0) {
                console.log(`There's no course with the id ${course.id}`);
                return {...state};
            }
            state.courses.splice(index, 1);
            return {...state, courses: [...state.courses, course]};
        });
    },
    deleteCourse: (courseId: string) => {
        set((state: StoreProps): StoreProps => {
            const index = state.courses.findIndex((c: Course) => c.id === courseId);
            if (index < 0) {
                console.log(`There's no course with the id ${courseId}`);
                return {...state};
            }
            state.courses.splice(index, 1);
            return {...state};
        })
    },
    enrollments: [],
    addEnrollment: (enrollment: Enrollment) => set(state => {
        const enrollmentIndex = state.enrollments.findIndex((e: Enrollment) => e.id === enrollment.id);
        if (enrollmentIndex >= 0) {
            console.log(`There's already an enrollment with the id ${enrollment.id}`);
            return {...state}
        }
        const studentIndex = state.students.findIndex((s: Student) => s.id === enrollment.studentId);
        const courseIndex = state.courses.findIndex((c: Course) => c.id === enrollment.courseId);

        if (studentIndex < 0 || courseIndex < 0) {
            console.log(`There is no student with the id ${enrollment.studentId} or that there is no course with the id ${enrollment.courseId}`);
            return {...state}
        }
        return {...state, enrollments: [...state.enrollments, enrollment]};
    }),
    deleteEnrollment: enrollmentId => {
        set(state => {
            const enrollmentIndex = state.enrollments.findIndex((e: Enrollment) => e.id === enrollmentId);
            if (enrollmentIndex < 0) {
                console.log(`There's no enrollment with the id ${enrollmentId}`);
                return {...state}
            }
            state.enrollments.splice(enrollmentIndex, 1);
            return {...state};
        })
    },
}));


export default useStore;