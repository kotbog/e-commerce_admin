import {FC} from "react";
import {Table} from "flowbite-react";
import OrderedProductsTable from "@/app/orders/[orderId]/OrderedProductsTable";
import CustomerData from "@/app/products/[itemId]/CustomerData";


type OrderProfileProps = {
    params: {
        orderId: string
    }
}

async function getOrderDetails(orderId : string)  {
    const res = await fetch(`http://localhost:4000/order/${orderId}`, {
        method: 'GET',
        cache: "no-cache"
    })
    return res.json();
}

const OrderProfile : FC<OrderProfileProps> = async ({params}) => {
    const orderData = await getOrderDetails(params.orderId);

    return <div>
        <h1 className={'font-bold my-5 text-xl'}>Order List</h1>
        <OrderedProductsTable orderItems={orderData}/>
        <CustomerData userData={orderData?.order[0].order.user}/>
    </div>
}

export default OrderProfile;