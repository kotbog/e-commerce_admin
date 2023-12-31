import LoginForm from "@/app/auth/login/LoginForm";
import {AuthorizeResponse} from "@/app/types";
import {revalidateTag} from "next/cache";
import {cookies} from "next/headers";

// type LoginFormResponse = AuthorizeResponse & {
//     token: string
// }

// async function handleLoginFormAction(data : FormData ) : Promise<AuthorizeResponse | LoginFormResponse> {
//     "use server";
//     const response  = await fetch(`http://localhost:4000/login`, {
//         method: 'post',
//         body: JSON.stringify({email: data.get('email'), password: data.get('password')}),
//         cache: 'no-cache',
//         credentials: 'include',
//         headers: {
//             "Content-type": 'application/json',
//             'Access-Control-Allow-Credentials': 'true',
//             Cookie: cookies().toString()
//         }
//     })
//     revalidateTag('auth')
//     return await response.json();
// }



const Login = () => {
    return <div className={'w-1/3'}>
        <LoginForm />
    </div>
}

export default Login;