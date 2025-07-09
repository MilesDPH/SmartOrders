import {useMemo, useState} from "react";
import type {Cart, MenuItem} from "../interfaces.ts";

export function useCart() {
    const [cart, setCart] = useState<Cart[]>([]);


    function _findById(id: number): number {
        return cart.findIndex((element) => element.id === id);
    }

    function _debugCart() {
        console.log(cart);
    }

    function addCart(menu_item: MenuItem, quantity: number) {
        try {
            const index = _findById(menu_item.id);
            const updatedCart = [...cart];

            if (index !== -1) {
                updatedCart[index].quantity = cart[index].quantity + 1;
                setCart(updatedCart);

                return;
            }
            updatedCart.push({...menu_item, quantity: quantity})
            setCart(updatedCart);
        } catch (e) {
            console.log("Error adding item: " + e);
        }
    }

    function removeCart(menu_item: MenuItem) {
        try {
            const index = _findById(menu_item.id);
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
        } catch (e) {
            console.log("Error deleting item: " + e);
        }
    }

    const total = useMemo(() => {
        if(cart.length < 1)
            return 0;

        console.log(cart.length);
        console.log(cart)

        return cart.reduce((total, currentValue) => {
            return total + (currentValue.quantity * currentValue.price)
        }, 0)
    }, [cart]);

    return {
        addCart, removeCart, cart, total
    }


}