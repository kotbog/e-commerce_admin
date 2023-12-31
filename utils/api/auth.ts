type AuthResponse = {
    error: boolean,
    message: string,
    userId?: string
}
type RefreshResponse = {
    error: boolean,
    message: string,
    userId?: string
}

export async function authMe() : Promise<AuthResponse> { // authorize user
    const res = await fetch('http://localhost:4000/me', {
        method: 'GET',
        cache: 'no-store',
        next: {
            tags: ['auth']
        }
    });
    return await res.json();
}
