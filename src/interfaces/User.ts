interface User {
    id: string;
    name: string;
    email: string;
    city: string;
    registrationDate: Date;
    role: 'Admin' | 'Student';
}

export default User;