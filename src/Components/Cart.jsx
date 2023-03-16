import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { FaTrash } from "react-icons/fa"
import { MdAdd, MdCancel, MdDelete, MdRemove } from 'react-icons/md'
import { BiMinus } from 'react-icons/bi'
import { CartContext } from '../Context/CartProvider'
import { Divider, IconButton } from '@mui/material'
import emptyCart from "../Assets/Images/emptycart.svg"
import { dollarString } from '../Utilty/CurrencyFormatter'





function Cart({ openCart, setOpenCart }) {

    const { items, addOneToCart,
        removeOneFromCart,
        getTotalCost,
        deleteFromCart,
        getSumTotal,
        getProductQuantity } = useContext(CartContext)




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
                            <div key={key} className='flex w-[100%] py-2 gap-2 flex-row justify-between items-center'>
                                <div className='w-[40%] flex flex-row justify-center items-center gap-5 overflow-hidden '>
                                    <div className='w-[35px] h-[35px] flex-none  overflow-hidden rounded-md'>
                                        <img src={item.image} alt={'img'} className=" w-full h-full object-cover" />
                                    </div>
                                    <div className='truncate w-full'>
                                        {item.name}
                                    </div>
                                </div>
                                <div>

                                    <div className='flex flex-auto w-fit flex-row'>

                                        <div className='flex text-[1.1rem]  flex-row justify-center gap-2 items-center'>
                                            <button onClick={() => removeOneFromCart(item)} className='p-1 py-0 bg-teal-200 text-teal-800'>
                                                <MdAdd />
                                            </button>
                                            <p className='p-1 py-0 '>{getProductQuantity(item)}</p>
                                            <button onClick={() => addOneToCart(item)} className='p-1 py-0 bg-teal-200 text-teal-800'>
                                                <MdRemove />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                <div className='flex-auto truncate flex flex-col justify-center items-center'>
                                    {"$ " + getTotalCost(item)}
                                </div>
                                <IconButton onClick={() => deleteFromCart(item)} >
                                    <FaTrash size={12} color={"red"} />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                )}



            </motion.div>
            <div className=" flex md:hidden " >
                <motion.div className=" overflow-hidden pt-20  shadow-xl shadow-gray-600 absolute z-[100] top-0 right-0 h-screen flex-col justify-center items-center  bg-gray-100"
                    animate={{
                        width: openCart ? "100%" : "0%",
                    }}>

                    {items.length !== 0 ? (
                        <div className='px-5' >
                            {items.map((item, key) => (
                                <div key={key} className='flex w-[100%] py-2 gap-2 flex-row justify-between items-center'>
                                    <div className='w-[40%] flex flex-row justify-center items-center gap-5 overflow-hidden '>
                                        <div className='w-[35px] h-[35px] flex-none  overflow-hidden rounded-md'>
                                            <img src={item.image} alt={'img'} className=" w-full h-full object-cover" />
                                        </div>
                                        <div className='truncate w-full'>
                                            {item.name}
                                        </div>
                                    </div>
                                    <div>

                                        <div className='flex flex-auto w-fit flex-row'>

                                            <div className='flex text-[0.9rem]  flex-row justify-center gap-2 items-center'>
                                                <button onClick={() => addOneToCart(item)} className='p-1 py-0 bg-teal-200 text-teal-800'>
                                                    <MdAdd />
                                                </button>
                                                <p className='p-1 py-0 '>{getProductQuantity(item)}</p>
                                                <button onClick={() => removeOneFromCart(item)} className='p-1 py-0 bg-teal-200 text-teal-800'>
                                                    <MdRemove />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex-auto text-[0.7rem] truncate flex flex-col justify-center items-center'>
                                        {dollarString.format(getTotalCost(item))}
                                    </div>
                                    <IconButton onClick={() => deleteFromCart(item)} >
                                        <FaTrash size={12} color={"red"} />
                                    </IconButton>
                                </div>
                            ))}
                            <div className='w-full flex mt-10 flex-col justify-center items-center'>
                                <Divider />
                                <h1 className='text-[1rem] opacit-50'>Sum total:</h1>
                                <p className='font-medium text-[1.6rem] font-bold'>{dollarString.format(getSumTotal())}</p>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full h-[80%] flex flex-col justify-center items-center'>
                            <img src={emptyCart} className={"w-[50%] h-[50%] filter grayscale object-fill"} />
                            <h1 className='text-gray-500 text-[1.1rem]  '>Cart currently empty</h1>
                        </div>
                    )}



                </motion.div>
            </div >
        </div >
    )
}

export default Cart