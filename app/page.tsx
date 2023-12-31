import Link from "next/link";


function Home() {
  return <div className={'flex flex-col'}>
    <Link href={'/auth/login'}>Log In</Link>
    <Link href={'/auth/signup'}>Sign Up</Link>

  </div>
}
export default Home;