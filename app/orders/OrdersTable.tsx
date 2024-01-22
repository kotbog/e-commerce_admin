'use client'

import {Select, Table} from "flowbite-react";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {Order, OrderDetails} from "@/app/types";
import Link from "next/link";
import TableRow from "@/app/orders/TableRow";
import {findAllInRenderedTree} from "react-dom/test-utils";
import {element} from "prop-types";

type ProductTableProps = {
    orders: Array<OrderDetails>,
    update: ({id, status} : {id: string, status: string}) => Promise<{ error: boolean }>
}

const OrdersTable : FC<ProductTableProps> = ({orders, update}) => {
    const [ordersList, setOrdersList] = useState<Array<OrderDetails>>();
    
    useEffect(() => {
        setOrdersList(orders.sort((a, b) =>  {
            return a.status == 'Processing' ? -1 : b.status == 'Processing' ? 1 : 0;
        }))
    }, [orders]);


    async function handleStatusChange(event: ChangeEvent<HTMLSelectElement>, id: string) {
        const option = event.target.value;
        const res = await update({id: id, status: option});
        if(res.error) console.log('error');
    }

    return <Table>
        <Table.Head>
            <Table.HeadCell>Order Id</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>User details</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
                <span className="sr-only">Edit</span>
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {
                ordersList?.map(item => {
                    return <TableRow onChangeStatus={handleStatusChange} key={item._id} id={item._id} status={item.status} user={item.user} date={item.created_at} total={item.total}/>
                })
            }
        </Table.Body>
    </Table>
}

export default OrdersTable;