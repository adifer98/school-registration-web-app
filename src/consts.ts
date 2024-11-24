import User from "./interfaces/User.ts";
import Course from "./interfaces/Course.ts";
import enrollment from "./interfaces/Enrollment.ts";

export const USERS: User[] = [
    {
        id: "1",
        name: "Adi Fermon",
        email: "adif@one1.co.il",
        city: "Herzliya",
        role: "Student",
        registrationDate: new Date(),
        password: "adi1"
    },
    {
        id: "2",
        name: "Yair Fermon",
        email: "yair@one1.co.il",
        city: "Herzliya",
        role: "Student",
        registrationDate: new Date(),
        password: "yair2",
    },
    {
        id: "3",
        name: "Shiran",
        email: "shiran@one1.co.il",
        city: "Rishon LeZion",
        role: "Admin",
        registrationDate: new Date(),
        password: "shiran3",
    },
    {
        id: "4",
        name: "Avigail",
        email: "avigail@one1.co.il",
        city: "Petach Tikva",
        role: "Admin",
        registrationDate: new Date(),
        password: "avigail4",
    },
    {
        id: "5",
        name: "Shlomi",
        email: "shlomi@one1.co.il",
        city: "Tel Aviv",
        role: "Student",
        registrationDate: new Date(),
        password: "shlomi5",
    },
];


export const COURSES: Course[] = [
    {
        id: "1",
        title: "Intro to computer Science",
        description: "A course that fits to everyone who want to learn about this interesting field",
        hours: 30,
        price: 99
    },
    {
        id: "2",
        title: "Intro to Machine Learning",
        description: "A course that fits to everyone who want to learn about this interesting field",
        hours: 13,
        price: 550
    },
    {
        id: "3",
        title: "Physics",
        description: "A course that fits to everyone who want to learn about this interesting field",
        hours: 13,
        price: 49
    },
    {
        id: "4",
        title: "Biology",
        description: "A course that fits to everyone who want to learn about this interesting field",
        hours: 15,
        price: 200
    },
]

export const ENROLLMENTS: enrollment[] = [
    {
        id: "1",
        userId: "1",
        courseId: "1",
        createdDate: new Date()
    },
    {
        id: "2",
        userId: "1",
        courseId: "2",
        createdDate: new Date()
    },
    {
        id: "3",
        userId: "3",
        courseId: "1",
        createdDate: new Date()
    },
    {
        id: "4",
        userId: "4",
        courseId: "4",
        createdDate: new Date()
    },
    {
        id: "5",
        userId: "5",
        courseId: "3",
        createdDate: new Date()
    }
]
