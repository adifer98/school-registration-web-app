import {create} from "zustand";
import Course from "../interfaces/Course.ts";
import {COURSES} from "../consts.ts";


export interface resultProps {
    succeeded: boolean;
    message: string;
}


interface StoreProps {
    courses: Course[];
    isCourseIdExists: (id: string) => resultProps;
    isCourseIdNotExists: (id: string) => resultProps;
    isCourseHoursValid: (hours: number) => resultProps;
    isCoursePriceValid: (price: number) => resultProps;
    addCourse: (course: Course) => resultProps;
    updateCourse: (course: Course) => resultProps;
    deleteCourse: (courseId: string) => resultProps;
}


const useCoursesStore = create<StoreProps>((set) => ({
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

            message = 'Course deleted successfully!';
            succeeded = true;

            return {...state};
        })
        return {succeeded, message};
    }
}));


export default useCoursesStore;