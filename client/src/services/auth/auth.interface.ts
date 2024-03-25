export interface User {
    id?: string | number
    name: string,
    email: string,
    date: string,
    role: string
    phone_number: string
}

export interface AuthState {
    user: User | null,
    token: string | null
    
}
export interface AuthLogin {
    token: string | null
    role: string 
}