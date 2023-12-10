'use client'
import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ProductEditor from "@/app/products/[itemId]/ProductEditor";
import useSWR from "swr";


type Product = {
    name: string,
    SKU: number | string,
    desc?: string,
    _id: string | number,
    price: number,
    images?: Array<string>,
    created_at: Date
}

type ProductsPageProps = {
    params: {
        itemId: string
    }
}

const fetchDataByID = (path : string) => {
    console.log('fetch')
    return fetch(path, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res.json();
    }).catch(e => {console.error(e)});
}


const ProductsPage : FC<ProductsPageProps> = ({params}) => {
    const [productData, setProductData] = useState<Product | null>(null);
    const router = useRouter();
    useEffect(() => {
        fetch(`http://localhost:4000/product/${params.itemId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (res) => {
            setProductData(await res.json());
        }).catch(e => {console.error(e)});
    }, [params.itemId]);

    async function handleClickDelete () {
        await fetch(`http://localhost:4000/product/${params.itemId}`, {
            method: 'DELETE'
        })
            .then(() => {router.push('/products')})
            .catch((e) => {console.error(e)});
    }
    return <div>
        {params.itemId}
        {productData ?
            <ProductEditor name={productData.name} article={productData.SKU as string} price={productData.price} desc={productData.desc} images={productData.images}/>
            : <div>Loading...</div>
        }
        <button className={'p-3'} onClick={handleClickDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </button>

    </div>
}
export default ProductsPage