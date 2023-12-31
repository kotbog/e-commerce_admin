"use client"

import Link from "next/link";
import {FC} from "react";
import Image from "next/image";

type ProductListItemProps = {
    _id: string | number,
    name: string,
    img?: string,
    price: number | string
}
const ProductListItem : FC<ProductListItemProps> = ({_id, name,img, price}) => {
    return <li className={'bg-gray-900 rounded-xl h-24 my-3'}>
        <Link href={`products/${_id}`} className={'flex w-full h-full p-5 items-center justify-between'}>
            <div className={'w-20'}>
                <Image src={img ? img : ""} alt={`${name}-img`} width={50} height={100} className={'object-contain'}/>
            </div>
            <p className={'basis-3/4'}>{name}</p>
            <p>${price}</p>
        </Link>
    </li>
}
export default ProductListItem;