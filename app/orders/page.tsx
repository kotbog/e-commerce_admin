import {Table} from "flowbite-react";
import OrdersTable from "@/app/orders/OrdersTable";
import {Order, OrderDetails} from "@/app/types";
import {revalidateTag} from "next/cache";
import {log} from "node:util";

type getOrdersResponse = {
    orders: Array<OrderDetails>,
    error: boolean
}
async function getOrders () : Promise<getOrdersResponse> {
    console.log('revalidate')
    const res = await fetch('http://localhost:4000/order', {
        method: 'GET',
        next: {
            revalidate: 5,
            tags: ['orders']
        }
    })
    return await res.json();
}

async function updateOrderStatus(data : {id: string, status: string}) {
    'use server'
        const res = await fetch('http://localhost:4000/order/status', {
            method: 'PUT',
            body: JSON.stringify({id: data.id, status: data.status}),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    revalidateTag('orders');
    return res.json();
}
export default async function Orders () {
    const response = await getOrders();
    return <div>
        <h1 className={'font-bold text-xl mb-5'}>Замовлення</h1>
        <OrdersTable update={updateOrderStatus} orders={response.orders}/>
    </div>
}