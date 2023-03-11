import React from 'react'
import { motion } from "framer-motion"
import { } from "react-icons/fa"
import { MdAdd } from 'react-icons/md'
import { BiMinus } from 'react-icons/bi'



const CartItem = ({ image, title, price, quantity }) => {

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


    return (
        <div style={{
            width: openCart ? "100%" : "0%"
        }} className='w-screen h-screen top-0 fixed text-[0.8rem] nd:text-[1rem] right-0 z-50 '>
            <div onClick={() => setOpenCart(false)} className='bg-gray-800 opacity-20 w-full h-full absolute top-0 left-0 z-20 ' />
            <motion.div className=" overflow-hidden  shadow-medium absolute z-[100] right-0 h-screen flex-col justify-center items-center  bg-white"
                animate={{
                    width: openCart ? "25%" : "0%",

                }}>

                {/*Desktop cart */}


            </motion.div>
            <div className=" flex md:hidden " >
                <motion.div className=" overflow-hidden shadow-xl shadow-gray-600 absolute z-[100] top-0 right-0 h-screen flex-col justify-center items-center  bg-gray-100"
                    animate={{
                        width: openCart ? "80%" : "0%",

                    }}>

                    {/*Mobile cart */}



                </motion.div>
            </div >
        </div >
    )
}

export default Cart