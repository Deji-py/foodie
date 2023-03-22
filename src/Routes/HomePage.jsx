import { Avatar, CircularProgress, useStepContext } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { MdError, MdLiveTv } from 'react-icons/md'
import { Outlet, useAsyncError, useLoaderData, useLocation, useNavigate, useRouteError } from 'react-router-dom'
import Categories from '../Components/Categories'
import HeroSection from '../Components/HeroSection'
import HomeLayout from '../Components/HomeLayout'
import Weserve from '../Components/Weserve'
import { AuthContext } from '../Context/AuthProvider'
import { CartContext } from '../Context/CartProvider'
import { db } from '../firebase_config'
import ItemCard from '../Utilty/ItemCard'
import Modal from '../Utilty/Modal'
import CategoryList from './CategoryList'
import Details from './Details'


const Dash = ({ name, avatar }) => {
    const date = new Date()
    const { user } = useContext(AuthContext)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (

        <div className=' w-full h-[150px]  mt-10 px-2 '>
            <div className=' bg-gradient-to-r shadow-gray-300 from-secondary gap-5 to-primary flex flex-row items-center justify-start shadow-lg  text-white rounded-2xl w-full h-full'>
                <div className='flex-1 border-r-2 flex flex-col justify-center items-center'>

                    <Avatar src={avatar} className='border-2 mb-2  border-secondary' style={{
                        width: 50,
                        height: 50,

                    }} />
                    <div className='flex flex-col justify-center items-center'>
                        Welcome Back,
                        <p>
                            {name}
                        </p>
                    </div>
                    <p className='text-[1.3rem]'>
                        {user?.displayName}
                    </p>
                </div>
                <div className='w-[30%] '>
                    <p className='bg-white text-red-600 flex p-2 w-fit h-fit rounded-full justify-center items-center'>{date.getDate()}</p>
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


    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {

        navigate("Foods")

    }, [])





    return (
        <>
            <div className="flex-1 flex flex-col h-full  gap-5 w-full md:w-full items-center">
                <div className="w-full h-fit ">

                    <div className='flex flex-col justify-center items-center md:flex-row  md:justify-start md:flex-wrap gap-5 pb-10'>
                        <div className='w-full flex flex-col  justify-center md:justify-start gap-5 px-2 items-center '>
                            <Dash name={currentUser?.displayName} />
                            <Outlet />

                        </div>
                    </div>
                </div>
            </div>



        </>


    )
}


export default HomePage