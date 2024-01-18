'use client'

import {Select, Table} from "flowbite-react";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {Order} from "@/app/types";
import Link from "next/link";
import TableRow from "@/app/orders/TableRow";
import {findAllInRenderedTree} from "react-dom/test-utils";
import {element} from "prop-types";

type ProductTableProps = {
    orders: Array<Order>
}

const OrdersTable : FC<ProductTableProps> = ({orders}) => {
    const [ordersList, setOrdersList] = useState<Array<Order>>();
    
    useEffect(() => {
        setOrdersList(orders.sort((a, b) =>  {
            return a.order.status == 'Processing' ? -1 : b.order.status == 'Processing' ? 1 : 0;
        }))
    }, [orders]);


    function handleStatusChange(event: ChangeEvent<HTMLSelectElement>, id: string) {
        const option = event.target.value;
        let tempOrders : Array<Order> = [...ordersList];

        ordersList?.forEach((element, index) => {
            if(element._id === id) {
                tempOrders.splice(index, 1);
                element.order.status = option;
                if(option == 'Processing') tempOrders.unshift(element);
                else tempOrders.push(element);
            }
        })
        setOrdersList(tempOrders);
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
                    return <TableRow onChangeStatus={handleStatusChange} key={item._id} id={item._id} status={item.order.status} user={item.order.user} date={item.created_at} total={item.order.total}/>
                })
            }
        </Table.Body>
    </Table>
}

export default OrdersTable;