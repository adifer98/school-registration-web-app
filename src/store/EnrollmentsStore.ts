import {create} from "zustand";
import Enrollment from "../interfaces/Enrollment.ts";
import {ENROLLMENTS} from "../consts.ts";
import {resultProps} from "./UsersStore.ts";




interface StoreProps {
    enrollments: Enrollment[];
    isEnrollmentIdNotExists: (id: string) => resultProps;
    addEnrollment: (enrollment: Enrollment) => void;
    deleteEnrollmentById: (enrollmentId: string) => resultProps;
    deleteEnrollmentsByUserId: (userId: string) => void;
    deleteEnrollmentsByCourseId: (courseId: string) => void;
}


const useEnrollmentsStore = create<StoreProps>((set) => ({
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
        set(state => {
            return {...state, enrollments: [...state.enrollments, enrollment]};
        })
    },
    deleteEnrollmentById: (enrollmentId : string) => {
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
    deleteEnrollmentsByUserId: (userId: string) => {
        set(state => {
            const filteredEnrollments = state.enrollments.filter((e: Enrollment) => e.userId !== userId);
            return {...state, enrollments: filteredEnrollments};
        });
    },
    deleteEnrollmentsByCourseId: (courseId : string) => {
        set(state => {
            const filteredEnrollments = state.enrollments.filter((e: Enrollment) => e.courseId !== courseId);
            return {...state, enrollments: filteredEnrollments};
        });
    }
}));


export default useEnrollmentsStore;