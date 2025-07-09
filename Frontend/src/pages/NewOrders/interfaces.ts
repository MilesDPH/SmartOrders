export interface MenuItem {
    id: number;
    name: string;
    price: number;
    category_id?: number;
}

export interface Cart extends MenuItem {
    quantity: number;
}