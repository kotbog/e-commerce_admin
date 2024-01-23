'use client'

import {OrderDetails} from "@/app/types";
import {useState} from "react";
import {
    ChartData,
    Chart as ChartJS,
    registerables
} from "chart.js";
import {Chart} from "react-chartjs-2";

ChartJS.register(...registerables)

const ChartProducts = ({orders}: { orders: Array<OrderDetails> }) => {
    const [chartOrders, setChartOrders] = useState<ChartData>({
        labels: orders.map(item => new Date(item.created_at).getFullYear()),
        datasets: [
            {
                label: 'Sales',
                data: orders.map(item => Number(item.total))
            }
        ]
    });

    return <Chart type={"line"} data={chartOrders}/>
}

export default ChartProducts;