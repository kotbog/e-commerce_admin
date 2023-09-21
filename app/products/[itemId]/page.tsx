import {FC} from "react";

type ProductsPageProps = {
    params: {
        itemId: string
    }
}
const ProductsPage : FC<ProductsPageProps> = ({params}) => {
    return <div>
        {params.itemId}
    </div>
}
export default ProductsPage