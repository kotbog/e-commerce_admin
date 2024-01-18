'use client'

import {Select, Table} from "flowbite-react";
import {FC} from "react";
import {Order} from "@/app/types";
import Link from "next/link";

type ProductTableProps = {
    orders: Array<Order>
}

const ProductTable : FC<ProductTableProps> = ({orders}) => {
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
                orders.map(item => {
                    return <Table.Row key={item._id} className={"bg-white dark:border-gray-700 dark:bg-gray-800"}>
                        <Table.Cell>{item._id}</Table.Cell>
                        <Table.Cell>${item.order.total}</Table.Cell>
                        <Table.Cell>{item.created_at.toLocaleString()}</Table.Cell>
                        <Table.Cell>
                            <p>+{item.order.user.telephone}</p>
                            <p>{item.order.user.email}</p>
                            <p>{item.order.user.last_name} {item.order.user.first_name}</p>
                        </Table.Cell>
                        <Table.Cell>
                            <Select>
                                <option>Done</option>
                                <option>Processing</option>
                                <option>Failed</option>
                            </Select>
                        </Table.Cell>
                        <Table.Cell><Link href={'/order/' + item._id} className={'font-medium text-cyan-600 hover:underline dark:text-cyan-500'}>More...</Link></Table.Cell>
                    </Table.Row>
                })
            }
        </Table.Body>
    </Table>
}

export default ProductTable;