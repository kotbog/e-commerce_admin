import NextAuth, {AuthOptions, Session, SessionStrategy, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/login"
    },
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
                if(data.token) {
                    console.log(data)
                    return data;
                } else {
                    return null;
                }

            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, user,token}){
            session.user = token as any;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
