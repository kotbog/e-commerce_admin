import NextAuth from "next-auth/src";

declare module 'next-auth' {
    interface User {
        first_name: string;
        last_name: string;
        email: string;
        _id: string;
        telephone?: string;
        created_at: Date;
        role: 'User' | 'Admin' | 'SuperAdmin';
    }
}