import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { } from "react-icons/fa"
import { MdAdd } from 'react-icons/md'
import { BiMinus } from 'react-icons/bi'
import { CartContext } from '../Context/CartProvider'



const CartItem = ({ quantity, image, title, price }) => {

    return (
        <div className='flex w-[100%] py-2  flex-row justify-between items-center gap-5'>
            <div className='w-10 h-10 overflow-hidden rounded-md'>
                <img src={image} alt={'img'} className=" w-full h-full object-cover" />
            </div>
            <div className='truncate'>
                {title}
            </div>
            <div>

                <div className='flex flex-row'>
                    <button>
                        <MdAdd />
                    </button>
                    <p>{quantity}</p>
                    <button>
                        <BiMinus />
                    </button>
                </div>
            </div>
            <div>
                {price}
            </div>
        </div>
    )
}

function Cart({ openCart, setOpenCart }) {

    const { items } = useContext(CartContext)


    return (
        <div style={{
            width: openCart ? "100%" : "0%"
        }} className='w-screen h-screen top-0 fixed text-[0.8rem] nd:text-[1rem] right-0 z-50 '>
            <div onClick={() => setOpenCart(false)} className='bg-gray-800 opacity-20 w-full h-full absolute top-0 left-0 z-20 ' />
            <motion.div className=" overflow-hidden  shadow-medium absolute z-[100] right-0 h-screen flex-col justify-center items-center  bg-white"
                animate={{
                    width: openCart ? "25%" : "0%",

                }}>

                {items.length !== 0 && (
                    <div >
                        {items.map((item, key) => (
                            <CartItem quantity={item.quantity} item={item} image={item.image} title={item.name} price={item.price} key={key} />
                        ))}
                    </div>
                )}



            </motion.div>
            <div className=" flex md:hidden " >
                <motion.div className=" overflow-hidden pt-20  shadow-xl shadow-gray-600 absolute z-[100] top-0 right-0 h-screen flex-col justify-center items-center  bg-gray-100"
                    animate={{
                        width: openCart ? "80%" : "0%",

                    }}>

                    {items.length !== 0 && (
                        <div className='px-5' >
                            {items.map((item, key) => (
                                <CartItem quantity={item.quantity} image={item.image} title={item.name} price={item.price} key={key} />
                            ))}
                        </div>
                    )}



                </motion.div>
            </div >
        </div >
    )
}

export default Cart