import {FunctionComponent} from "react";

export async function getServerSideProps() {
    const res = await fetch("http://localhost:4000/product/", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
    const products = await res.json();
    return {
        props: {
            products
        }
    }
}

type Product = {
    name: string,
    SKU: number | string,
    desc?: string,
    _id: string | number,
    price: number,
    images?: Array<string>
}

type ProductsProps = {
    products: Array<Product>
}
const Products : FunctionComponent<ProductsProps> = ({products}) => {
    return <div>{products ? products.map(item => item.name):"undefined"}</div>
}

export default Products;

