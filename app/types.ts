export type Product = {
    name: string,
    SKU: number | string,
    desc?: string,
    _id: string | number,
    price: number,
    images?: Array<string>,
    category?: string,
    created_at: Date
}

export type Category = {
    _id: string,
    name: string,
    desc?: string
}

export type AuthorizeResponse = {
    error: boolean,
    message: string
}

export type User = {
    first_name: string,
    last_name: string,
    telephone: string,
    email: string,
    address: string,
    role?: string
}
export type OrderItem = {
    _id: string
    product: Product,
    order: OrderDetails
    quantity: number | string,
    created_at: Date
}
export type OrderItems  = {order: Array<OrderItem>}

export type OrderDetails = {
    _id: string,
    user: User,
    status: string,
    total: string
    created_at: string
}

