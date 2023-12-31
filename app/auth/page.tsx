import Link from "next/link";

export default function Page() {
    return <>
        <h2>Auth</h2>
        <Link href={'/auth/login'}>Log In</Link>
        <Link href={'/auth/signup'}>Sign Up</Link>
    </>
}