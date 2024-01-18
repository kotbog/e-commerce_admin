import {Table} from "flowbite-react";
import ProductTable from "@/app/orders/ProductTable";
import {Order} from "@/app/types";

type getOrdersResponse = {
    orders: Array<Order>,
    error: boolean
}
async function getOrders () : Promise<getOrdersResponse> {
    const res = await fetch('http://localhost:4000/order', {
        method: 'GET',
        next: {revalidate: 5}
    })
    return await res.json();
}
export default async function Orders () {
    const response = await getOrders();
    return <div>
        <h1 className={'font-bold text-xl mb-5'}>Замовлення</h1>
        <ProductTable orders={response.orders}/>
    </div>
}