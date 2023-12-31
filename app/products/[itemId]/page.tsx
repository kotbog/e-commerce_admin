import ProductEditor from "@/app/products/ProductEditor";
import {Product} from "@/app/types";




async function getProductData (id : string) : Promise<Product | undefined> {

    const res = await fetch(`http://localhost:4000/product/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store'
    })
    return await res.json();
}

type ProductsPageProps = {
    params: {
        itemId: string
    }
}

const ProductsPage  = async ({params} : ProductsPageProps) => {

    const productData = await getProductData(params.itemId);


    return <div>
        {params.itemId}
        {productData ?
            <ProductEditor
                id={params.itemId}
                name={productData.name}
                article={productData.SKU as string}
                price={productData.price} desc={productData.desc}
                imgs={productData.images}
                bannerText={'товар був змінений'}
                category={productData.category}
                update={true}
            />
        : <div>loading...</div>
        }
    </div>
}
export default ProductsPage