import { CircularProgress, useStepContext } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MdError, MdLiveTv } from 'react-icons/md'
import { Outlet, useAsyncError, useLoaderData, useLocation, useRouteError } from 'react-router-dom'
import Categories from '../Components/Categories'
import HeroSection from '../Components/HeroSection'
import HomeLayout from '../Components/HomeLayout'
import Weserve from '../Components/Weserve'
import { db } from '../firebase_config'
import ItemCard from '../Utilty/ItemCard'
import Modal from '../Utilty/Modal'
import CategoryList from './CategoryList'

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


    useEffect(() => {

        loadAll()

    }, [])




    return (
        <>
            <div className="flex-1 flex flex-col h-full  gap-5 w-full md:w-full items-center">
                <div className="w-full h-fit mt-10 ">
                    {location.pathname === "/dashboard/home" ? (
                        <div className='flex flex-col justify-center items-center md:flex-row  md:justify-start md:flex-wrap ml-5 gap-5 pb-10'>
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
                                        <>
                                            <Categories />
                                            {all.map((item, key) => (
                                                <ItemCard item={item} key={key} />
                                            ))}
                                        </>

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