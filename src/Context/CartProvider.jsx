
import React, { createContext, useState } from 'react'

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { }
})

const CartProvider = ({ children }) => {

    const [cartProducts, setCartProduct] = useState([])


    const getProductQuantity = (item) => {
        const quantity = cartProducts.find(product => product.id === item.id)?.quantity

        if (quantity === undefined) {
            return 0
        }
        return quantity
    }

    const addOneToCart = (item) => {
        const quantity = getProductQuantity(item)
        if (quantity === 0) { //product does not exist
            setCartProduct([
                ...cartProducts,
                item
            ])
        }
        else {
            setCartProduct(
                cartProducts =>
                    cartProducts.map(product =>
                        product.id === item.id ?
                            { ...product, quantity: product.quantity + 1 }
                            : product
                    )
            )
        }
    }


    const removeOneFromCart = (item) => {
        const quantity = getProductQuantity(item)
        if (quantity === 1) {
            deleteFromCart(item)
        }
        else {
            setCartProduct(
                cartProducts =>
                    cartProducts.map(product =>
                        product.id === item.id ?
                            { ...product, quantity: product.quantity - 1 }
                            : product
                    )
            )
        }
    }


    const deleteFromCart = (item) => {
        setCartProduct(cartProducts => cartProducts.filter(product => {
            return product.id != item.id
        }))
    }


    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        // getTotalCost
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider