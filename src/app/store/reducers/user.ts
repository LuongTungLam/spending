export interface User {
    id: string,
    avatar: string,
    description: string,
    email: string,
    fullName: string,
    isAuthenticated: boolean,
    token: string,
    validTo: string
}