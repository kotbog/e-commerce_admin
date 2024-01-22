'use client'

import {Table} from "flowbite-react";
import {FC} from "react";
import {OrderItems} from "@/app/types";

type OrderedProductsTableProps = {
    orderItems: OrderItems
}
const OrderedProductsTable : FC<OrderedProductsTableProps> = ({orderItems}) => {
    return <Table>
        <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
        </Table.Head>
        <Table.Body>
            {orderItems.order?.map(item => <Table.Row key={item._id} className={`bg-white dark:border-gray-700 dark:bg-gray-800`}>
                    <Table.Cell>{item.product.name}</Table.Cell>
                    <Table.Cell>{item.product.category}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.product.price}</Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
}
export default OrderedProductsTable;