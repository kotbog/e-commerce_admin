import Link from "next/link";
import {Chart} from "react-chartjs-2";
import ChartHome from "@/app/ChartProducts";
import ChartProducts from "@/app/ChartProducts";


const getOrders = async () => {
    const res = await fetch('http://localhost:4000/order', {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
    return res.json();
}

async function Home() {
    const orders = await getOrders();
    return <div className={'flex flex-col basis-1'}>
        <Link href={'/auth/login'}>Log In</Link>
        <Link href={'/auth/signup'}>Sign Up</Link>
        <div className={'flex basis-1/2'}>
            <ChartProducts orders={orders.orders}/>
        </div>
    </div>
}

export default Home;