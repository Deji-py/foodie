import { Avatar, CircularProgress, useStepContext } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { MdError, MdLiveTv } from 'react-icons/md'
import { Outlet, useAsyncError, useLoaderData, useLocation, useRouteError } from 'react-router-dom'
import Categories from '../Components/Categories'
import HeroSection from '../Components/HeroSection'
import HomeLayout from '../Components/HomeLayout'
import Weserve from '../Components/Weserve'
import { CartContext } from '../Context/CartProvider'
import { db } from '../firebase_config'
import ItemCard from '../Utilty/ItemCard'
import Modal from '../Utilty/Modal'
import CategoryList from './CategoryList'


const Dash = ({ name, avatar }) => {
    const date = new Date()
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (

        <div className=' w-full h-[150px]  mt-10 px-2 '>
            <div className=' bg-gradient-to-r from-secondary gap-5 to-primary flex flex-row items-center justify-start shadow-xl text-white rounded-2xl w-full h-full'>
                <div className='flex-1 border-r-2 flex flex-col justify-center items-center'>

                    <Avatar src={"https://img.freepik.com/free-photo/handsome-adult-male-posing_23-2148729713.jpg?w=740&t=st=1677006922~exp=1677007522~hmac=fde7d1dc20a3c88395322e973ebf47c3bb4aba7b4c2335a4c81b9685ec0caa00"} className='border-2 mb-2  border-teal-300' style={{
                        width: 50,
                        height: 50,

                    }} />
                    <p>
                        Welcome Back,
                        {name}
                    </p>
                    <p className='text-[1.3rem]'>
                        Ayodeji
                    </p>
                </div>
                <div className='w-[30%] '>
                    <p className='bg-white text-secondary flex p-2 w-fit h-fit rounded-full justify-center items-center'>{date.getDate()}</p>
                    <h1 className='text-[2rem]'>
                        {month[date.getMonth()]}
                    </h1>
                    <p>{date.getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

function HomePage() {
    const [all, setAll] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const [val, setVal] = useState()


    const loadAll = async () => {
        const list = []
        await getDocs(collection(db, "categories")).then((docs) => {
            docs.forEach((item) => {
                item.data().list.map((item) => {
                    list.push(item)
                    setAll(list)
                })
            })
            setLoading(false)

        })
    }

    const { cart, addOneToCart, removeOneFromCart } = useContext(CartContext)

    useEffect(() => {

        loadAll()
        console.log(cart)

    }, [cart])



    return (
        <>
            <div className="flex-1 flex flex-col h-full  gap-5 w-full md:w-full items-center">
                <div className="w-full h-fit ">
                    {location.pathname === "/dashboard/home" ? (
                        <div className='flex flex-col justify-center items-center md:flex-row  md:justify-start md:flex-wrap gap-5 pb-10'>
                            {loading ? (
                                <HomeLayout />
                            ) : (
                                <>
                                    {all.length === 0 ? (
                                        <div className='flex flex-col justify-center w-full h-[70vh] items-center'>
                                            <MdError size={50} className={"text-red-400 mb-5"} />
                                            <p className='text-gray-600'>
                                                OOps!! Something went wrong
                                            </p>
                                            <p className='bg-teal-100 text-teal-800 p-2 mt-2'>Try refreshing...</p>
                                        </div>
                                    ) : (
                                        <div className='w-full flex flex-col  justify-center md:justify-start gap-5 px-2 items-center '>
                                            <Dash />
                                            <Categories allItems={all} />
                                            <p className='text-gray-500 font-[500]'>-All Categories-</p>
                                            <div className='w-full flex flex-col md:flex-row md:flex-wrap  justify-center md:justify-start gap-5 px-2 items-center'>
                                                {all.map((item, key) => (
                                                    <ItemCard removeOneFromCart={() => removeOneFromCart(item)} addOneToCart={() => addOneToCart(item)} item={item} key={key} />
                                                ))}
                                            </div>
                                        </div>

                                    )}
                                </>
                            )}

                        </div>
                    ) : (
                        <div className='flex flex-row md:px-0 md:justify-center justify-start items-center flex-wrap gap-5 pb-10'>
                            <Outlet />
                        </div>
                    )}
                </div>
            </div>

        </>


    )
}


export default HomePage