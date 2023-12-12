export type Product = {
    name: string,
    SKU: number | string,
    desc?: string,
    _id: string | number,
    price: number,
    images?: Array<string>,
    category_id?: string,
    created_at: Date
}

export type Category = {
    _id: string,
    name: string,
    desc?: string
}