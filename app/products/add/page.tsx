import ProductEditor from "@/app/products/ProductEditor";
import {useSession} from "next-auth/react";

const AddProductPage = () => {

    return <div>
        <ProductEditor
            id={''}
            name={''}
            article={''}
            price={''}
            bannerText={'товар був доданий'}
            update={false}
        />

    </div>
}

export default AddProductPage;