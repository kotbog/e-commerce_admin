'use client'

import {User} from "@/app/types";
import {Select, Table} from "flowbite-react";
import Link from "next/link";
import {ChangeEvent, FC} from "react";

type TableRowProps = {
    id: string,
    date: string,
    total: string,
    status: string,
    user: Partial<User>,
    onChangeStatus: (event: ChangeEvent<HTMLSelectElement>, id: string) => void
}

const TableRow: FC<TableRowProps> = ({id, date, total, user, status, onChangeStatus}) => {
    return <Table.Row
        className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${status == 'Done' || status == 'Failed' ? 'bg-gray-100' : ''}`}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>${total}</Table.Cell>
        <Table.Cell>{new Date(date).toLocaleString()}</Table.Cell>
        <Table.Cell>
            <p>+{user.telephone}</p>
            <p>{user.email}</p>
            <p>{user.last_name} {user.first_name}</p>
        </Table.Cell>
        <Table.Cell>
            <Select value={status} onChange={(e) => {onChangeStatus(e, id)}}>
                <option value={'Done'}>Done</option>
                <option value={'Processing'}>Processing</option>
                <option value={'Failed'}>Failed</option>
            </Select>
        </Table.Cell>
        <Table.Cell><Link href={'/order/' + id}
                          className={'font-medium text-cyan-600 hover:underline dark:text-cyan-500'}>More...</Link></Table.Cell>
    </Table.Row>
}
export default TableRow;