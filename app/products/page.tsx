import ProductListItem from "@/app/products/ProductListItem";
import Link from "next/link";
import SearchInput from "@/app/components/SearchInput";

type Product = {
    name: string,
    SKU: number | string,
    desc?: string,
    _id: string | number,
    price: number,
    images?: Array<string>,
    created_at: Date
}

type GetProductsRes = {
    products?: Array<Product>
}
async function getProducts() : Promise<GetProductsRes> {
    const res = await fetch(`${process.env.API_URL}product`, {
        method: 'GET',
        next: {revalidate: 5},
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log('revalidate')
    return await res.json();
}



const Products = async () => {

    let data = await getProducts();

    //return <div>{products ? products.map(item => item.name):"undefined"}</div>
    return <div className={'py-4'}>
        <SearchInput />
        <ul>
        {
            data.products?.map(item => <ProductListItem key={item._id} _id={item._id} name={item.name} price={item.price} img={item.images && item.images[0]}/>)
        }
        </ul>
        <Link href={'/products/add'} className={'w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full fixed bottom-10'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </Link>
    </div>
}

export default Products;

