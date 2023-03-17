import { IconButton, Rating } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { MdAdd, MdAddShoppingCart, MdCancel, MdCheck, MdRemove, MdTimer } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../Context/CartProvider'
import { dollarString } from './CurrencyFormatter'


function ItemCard({ setModalDetail, setModalOpen, item, addOneToCart, removeOneFromCart }) {

    const [added, setAdded] = useState(false)
    const { items, getProductQuantity, deleteFromCart } = useContext(CartContext)
    const [count, setCount] = useState(1)



    useEffect(() => {
        items.forEach((i) => {
            if (i.id === item.id) {
                setAdded(true)
            }
        })
    }, [])

    useEffect(() => {
        if (getProductQuantity(item) === 0) {
            setAdded(false)
        }
        else {
            setAdded(true)
        }
    }, [items])


    const handleAddQuantity = () => {
        addOneToCart(item)
    }

    const handleAddToCart = () => {
        addOneToCart()
        setAdded(true)
    }

    const handleRemoveQuantity = () => {
        removeOneFromCart(item)
        let quantity = getProductQuantity(item)
        if (quantity <= 1) {
            setAdded(false)
        }
    }

    const navigate = useNavigate()
    const params = useParams()
    return (
        <div className='md:w-[290px] w-[100%] overflow-hidden flex flex-col justify-between items-center rounded-xl shadow-xl  text-[0.8rem] relative  h-[350px]  bg-white flex-none'>
            <div onClick={() => {
                setModalOpen(true)
                setModalDetail(item)
            }} className='w-full h-[55%] relative overflow-hidden ' to={"/dashboard/categories/" + params.id + "/" + item.id}>

                <div className='bg-gray-300  h-full w-full left-0 overflow-hidden rounded-tl-xl rounded-tr-xl'>
                    <img src={item.image} className={"w-full h-full object-cover"} />
                </div>
                <div className='absolute top-0 bg-gradient-to-b from-[#0000005e] to-[#68686800]   w-full h-[50%]' />
                <div className='bg-yellow-100 shadow-[#00000073] text-black font-bold  left-0 px-3 py-3 absolute top-2 font-medium rounded-tr-full rounded-br-full shadow-md '>
                    {dollarString.format(item.price)}

                </div>
                <div className=' text-black font-bold  right-0 px-3 py-3 absolute top-2 font-medium rounded-tl-full rounded-bl-full flex flex-row justify-center items-center gap-2 '>
                    <MdTimer color='white' size={20} />
                    <p className='text-white'>2 hrs</p>
                </div>

            </div>

            <div className=' flex flex-col justify-start items-center flex-auto ' >

                <div onClick={() => {
                    setModalOpen(true)
                    setModalDetail(item)
                }} className='px-5  flex-1 '>

                    <div >
                        <p className='text-[1.2rem] my-3 font-bold '>{item.name}</p>
                        <div className='text-gray-500 font-medium '>
                            {item.description.length > 100 ? (<>{item.description.slice(0, 100) + "..."}</>) : (<>{item.description}</>)}
                        </div>
                    </div>

                </div>

                <div className='flex px-2 py-2  flex-row w-full items-center justify-between  '>
                    <Rating value={item.rating} size={"small"} sx={{
                        color: "#AD92F1"
                    }} />

                    {added ? (

                        <div className='flex flex-row justify-center items-center gap-5'>
                            <div className='flex text-[1.1rem]  flex-row justify-center gap-2 items-center'>
                                <button onClick={handleAddQuantity} className='p-1 py-0 bg-teal-300 text-teal-800'>
                                    <MdAdd />
                                </button>
                                <p className='p-1 py-0 '>{getProductQuantity(item)}</p>
                                <button onClick={handleRemoveQuantity} className='p-1 py-0 bg-teal-300 text-teal-800'>
                                    <MdRemove />
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    deleteFromCart(item)
                                    setAdded(false)
                                }
                                }
                                className='bg-red-600 flex text-[0.7rem] items-center flex-row gap-2 text-white p-2 rounded-full'>
                                <MdCancel /> Remove
                            </button>
                        </div>
                    ) : (
                        <IconButton onClick={handleAddToCart} sx={{ color: "black", padding: 0.65 }}>
                            <MdAddShoppingCart size={20} />
                        </IconButton>)}
                </div>
            </div>

        </div >
    )
}

export default ItemCard