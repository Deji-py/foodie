import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { } from "react-icons/fa"
import { MdAdd, MdFastfood } from 'react-icons/md'
import { CartCountContext } from '../Context/cartContext'
import { BiMinus } from 'react-icons/bi'
import { Divider } from '@mui/material'


const CartItem = ({ image, title, price }) => {
    const [count, setCount] = useState(1)
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
                    <p>{count}</p>
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
    const { cart } = useContext(CartCountContext)

    useEffect(() => {
    }, [cart.length])

    return (
        <div style={{
            width: openCart ? "100%" : "0%"
        }} className='w-screen h-screen top-0 fixed right-0 z-50 '>
            <div onClick={() => setOpenCart(false)} className='bg-gray-800 opacity-20 w-full h-full absolute top-0 left-0 z-20 ' />
            <motion.div className=" overflow-hidden  shadow-medium absolute z-[100] right-0 h-screen flex-col justify-center items-center  bg-white"
                animate={{
                    width: openCart ? "25%" : "0%",

                }}>


                {cart.length === 0 ? (
                    <>
                        <MdFastfood size={100} color={"lightGray"} />
                        <p className='text-[1.2rem] text-gray-500 pt-2'>Cart Currently Empty</p>
                    </>
                ) : (
                    <div className='flex flex-col justify-start px-5 items-center w-[100%]  gap-5'>
                        {cart.map((item, key) => (
                            <div key={key} className={"w-full"} >
                                <CartItem title={item.name} image={item.image} price={item.price} />
                                <Divider />

                            </div>
                        ))}

                        <button className='bg-primary w-[80%] p-2 rounded-full text-white text-[1.2rem]'>
                            Checkout
                        </button>
                    </div>
                )}


            </motion.div>
            <div className=" flex md:hidden " >
                <motion.div className=" overflow-hidden shadow-xl shadow-gray-600 absolute z-[100] top-0 right-0 h-screen flex-col justify-center items-center  bg-gray-100"
                    animate={{
                        width: openCart ? "80%" : "0%",

                    }}>


                    {cart.length === 0 ? (
                        <div className='w-full flex flex-col h-full  justify-center items-center'>
                            <MdFastfood size={100} color={"lightGray"} />
                            <p className='text-[1.2rem] text-gray-500 pt-2'>Cart Currently Empty</p>
                        </div>
                    ) : (
                        <div className='flex flex-col justify-start px-5 items-center w-[100%]  pt-[30%] h-full  gap-5'>
                            {cart.map((item, key) => (
                                <div key={key} className={"w-full"} >
                                    <CartItem title={item.name} image={item.image} price={item.price} />
                                    <Divider />

                                </div>
                            ))}

                            <button className='bg-primary w-[80%] p-2 rounded-full text-white text-[1.2rem]'>
                                Checkout
                            </button>
                        </div>
                    )}


                </motion.div>
            </div >
        </div >
    )
}

export default Cart