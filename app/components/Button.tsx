"use client"

import {FC} from "react";

type ButtonProps = {
    color?: "primary" | "red",
    value: string
}

const Button : FC<ButtonProps> = ({ value}) => {
    return <button className={"bg-blue-600 py-2 px-5 rounded-full"}>{value}</button>
}

export default Button;