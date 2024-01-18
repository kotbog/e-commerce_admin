"use client"

import React, {FC} from "react";

type ButtonProps = React.ComponentProps<"button"> & {
    color?: "primary" | "red",
    value: string

}

const Button : FC<ButtonProps> = ({ value,...props}) => {
    return <button className={"bg-blue-600 text-white py-2 px-5 rounded-full my-4"} {...props}>{value}</button>
}

export default Button;