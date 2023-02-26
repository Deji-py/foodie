import { IconButton, Rating } from '@mui/material'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { MdAddShoppingCart, MdCheck } from 'react-icons/md'
import food from "../Assets/Images/food2.jpg"
import { CartCountContext } from '../Context/cartContext'

function ItemCard({ item }) {

    const [added, setAdded] = useState(false)

    const { cart, setCart } = useContext(CartCountContext)




    const addItem = () => {
        setAdded(true)
        setCart([...cart, item])
    }

    const removeItem = () => {
        setAdded(false)
        const newCart = [...cart]
        newCart.splice(2, 1)
        setCart(newCart)
        // setCartCount([newCart])
    }


    return (
        <div className='md:w-[290px] w-full flex flex-col justify-between items-center rounded-xl shadow-xl text-[0.8rem] relative px-5 h-[300px] md:h-[250px] bg-white flex-none'>
            <div className='bg-gray-300  h-[45%] absolute w-full left-0 overflow-hidden rounded-tl-xl rounded-tr-xl'>
                <img src={item.image} className={"w-full h-full object-cover"} />
            </div>
            <div className='absolute bottom-2'>
                <div className=' px-3 h-[80px] overflow-hidden'>

                    <div >
                        <p className='text-[1.2rem] font-bold '>{item.name}</p>
                        <div className='text-gray-400 font-medium '>
                            {item.description.length > 100 ? (<>{item.description + "..."}</>) : (<>{item.description}</>)}
                        </div>
                    </div>

                </div>
                <div className='flex flex-row w-full items-center justify-between mt-2 px-5'>
                    <Rating value={item.rating} size={"small"} sx={{
                        color: "#2079fd"
                    }} />
                    <div className='bg-green-500 text-white px-3 font-medium rounded-tr-full rounded-br-full shadow-md shadow-gray-300'>
                        {"$ " + item.price}
                    </div>
                    {cart.includes(item) ? (<button
                        onClick={removeItem}
                        className='bg-primary flex items-center flex-row gap-2 text-white p-2 rounded-full'>
                        <MdCheck /> Added
                    </button>) : (<IconButton onClick={addItem} sx={{ color: "black" }}>
                        <MdAddShoppingCart size={20} />
                    </IconButton>)}
                </div>
            </div>

        </div>
    )
}

export default ItemCard