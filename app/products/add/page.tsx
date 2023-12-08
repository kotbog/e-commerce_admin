import AddProductForm from "@/app/products/add/AddProductForm";

const AddProductPage = () => {
    async function sendProductData(data: FormData) {
        try {
            return await fetch(`${process.env.API_URL}/product`,
                {
                    method: "POST",
                    body: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        } catch (e) {
            return e;
        }
    }
    return <div>
        <AddProductForm />
    </div>
}

export default AddProductPage;