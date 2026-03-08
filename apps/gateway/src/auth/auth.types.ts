export type UserContext = {
    ClerkUserId: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    isAdmin: boolean;
}