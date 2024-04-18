export interface User {
    id?: string | number;
    name: string;
    email: string;
    password: string;
    date: string;
    role: string;
    phone_number: string;
}

export interface UserState {
    users: User[]
}