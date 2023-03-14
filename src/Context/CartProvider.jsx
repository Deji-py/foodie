
import React, { createContext, useContext, useState } from 'react'

export const CartContext = createContext({
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    addToItem: () => { },
    removeFromItem: () => { },
    getAllItems: () => { },
    getSumTotal: () => { }
})

const CartProvider = ({ children }) => {


    const [cart, setCart] = useState([])

    const addOneToCart = (item) => {
        if (cart.includes(item.id)) {
            return
        }
        else {
            setCart([...cart, item])
        }
    }

    const removeOneFromCart = (product) => {

        if (cart.length === 0) {
            return
        }
        else {

            const newList = cart.filter((item) => {
                return item.id !== product.id
            })
            setCart(newList)
        }
    }

    const getAllItems = () => {
        return cart.length
    }

    const addToItem = (item) => {
        item.quantity += 1
        let totalprice = item.quantity * item.price
        return { quantity: item.quantity, totalprice: totalprice }
    }




    return (
        <CartContext.Provider value={
            {
                cart,
                addOneToCart,
                removeOneFromCart,
                getAllItems,
                addToItem,


            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider