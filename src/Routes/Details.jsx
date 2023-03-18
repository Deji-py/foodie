
import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { MdAdd, MdAddShoppingCart, MdCheck, MdRemove, MdShoppingCart } from 'react-icons/md'
import { CartContext } from '../Context/CartProvider'
import { dollarString } from '../Utilty/CurrencyFormatter'

function Details({ product, setModalOpen }) {
    const { items, getTotalCost, getProductQuantity, removeOneFromCart, addOneToCart, deleteFromCart } = useContext(CartContext)
    const [cost, setCost] = useState(getTotalCost(product))
    const [quantity, setQuantity] = useState(getProductQuantity(product))

    useEffect(() => {
        setQuantity(getProductQuantity(product))
        setCost(getTotalCost(product))
    }, [items])

    return (
        <div className='bg-gray-100 pb-20 overflow-y-scroll flex flex-col justify-start items-start text-medium p-5 px-3 absolute z-50 mt-20 w-[100vw] md:w-[60vh] h-[96vh] md:h-[80vh] z-100'>
            <IconButton className='my-2' onClick={() => setModalOpen(false)}>
                <BiX />
            </IconButton>
            <div className='w-full h-[50%] '>
                <img src={product?.image} alt="image" className='w-full rounded-2xl shadow-xl object-cover h-full' />
            </div>
            <div className='flex flex-row w-full justify-between items-center'>
                <p className='text-[1.5rem] truncate my-5 font-bold font-medium'>
                    {product?.name}
                </p>
                <h1 className='bg-yellow-200 px-5 p-2 rounded-tl-full shadow-xl rounded-bl-full'>
                    {dollarString.format(product?.price)}
                </h1>
            </div>
            <div className='mt-5'>
                <p>{product?.description}</p>
            </div>
            <div className=' w-full mt-10'>


                {quantity === 0 ?
                    (<div className='fixed  md:relative bottom-[0.1rem] z-[100] left-0  px-5  w-full  my-5'>

                        <button onClick={() => addOneToCart(product)} className=' flex flex-row justify-center w-full items-center gap-5 bg-black text-white rounded-xl shadow-xl p-3'>
                            <MdAddShoppingCart size={20} />
                            <p className='text-[1.2rem]'>Add to cart</p>
                        </button>
                    </div>) :
                    (
                        <div className='flex flex-col justify-center  w-[94vw] md:w-[100%] px-5  items-center'>
                            <div className='flex text-[1.5rem] w-full  flex-row justify-center gap-2 items-center'>
                                <button onClick={() => addOneToCart(product)} className='p-2  bg-teal-300 shadow-lg text-teal-800'>
                                    <MdAdd size={20} />
                                </button>
                                <p className='p-3 '>{quantity}</p>
                                <button onClick={() => removeOneFromCart(product)} className='p-2  bg-teal-300 shadow-lg text-teal-800'>
                                    <MdRemove size={20} />
                                </button>
                            </div>

                            <h1 className='text-[1.7rem] w-full  text-center mt-3 mb-10 font-bold '>{dollarString.format(cost)}</h1>
                            <div className='w-full fixed md:relative bottom-[0.1rem] z-[100] left-0  px-5 md:px-0 gap-10  my-5 flex flex-row justify-between items-center '>
                                <button onClick={() => setModalOpen(false)} className=' flex flex-row justify-center w-full md:w-fit items-center gap-5 bg-teal-500 text-white rounded-xl shadow-xl p-3'>
                                    <MdCheck size={20} />
                                    <p className='text-[1.2rem]'>Confirm</p>
                                </button>
                                <button onClick={() => deleteFromCart(product)} className=' flex flex-row justify-center w-full md:w-fit items-center gap-5 bg-red-500 text-white rounded-xl shadow-xl p-3'>
                                    <BiX size={20} />
                                    <p className='text-[1.2rem]'>Delete</p>
                                </button>
                            </div>


                        </div>
                    )
                }


            </div>
            <div>
            </div>

        </div>
    )
}

export default Details