import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'text',
                    placeholder: 'Ваш e-mail...'
                },
                password: {
                    label: 'Пароль',
                    type: 'password',
                    placeholder: 'Ваш пароль...'
                }
            },
            async authorize(credentials){
                const res = await fetch(`${process.env.API_URL}/login`, {
                    method: 'Post',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                const data = await res.json();
                console.log(data);
                if(data.status === 200 && data.user) {
                    return data.user;
                }else {
                    return null
                }

            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    }
}
