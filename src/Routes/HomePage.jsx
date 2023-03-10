import { CircularProgress, useStepContext } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MdLiveTv } from 'react-icons/md'
import { Outlet, useAsyncError, useLoaderData, useLocation, useRouteError } from 'react-router-dom'
import Categories from '../Components/Categories'
import Dashboard from '../Components/Dashboard'
import DashboardPrev from '../Components/DashboardPrev'
import HeroSection from '../Components/HeroSection'
import Weserve from '../Components/Weserve'
import { db } from '../firebase_config'
import ItemCard from '../Utilty/ItemCard'
import Modal from '../Utilty/Modal'
import CategoryList from './CategoryList'

function HomePage() {
    const [all, setAll] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const [val, setVal] = useState()


    const loadAll = async () => {
        setLoading(true)
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

                <HeroSection />
                <Weserve />
                <div className="h-fit px-0  md:px-10  w-full">
                    <Categories />
                    <div className="w-full h-fit mt-10 ">
                        {location.pathname === "/home" ? (


                            <div className='flex flex-col justify-center items-center md:flex-row  md:justify-start md:flex-wrap gap-5 pb-10'>
                                {loading ? (
                                    <Modal>
                                        <div className='bg-white rounded-md shadow-xl p-5'>

                                            <CircularProgress />
                                        </div>
                                    </Modal>

                                ) : (
                                    <>
                                        {all.map((item, key) => (
                                            <ItemCard item={item} key={key} />
                                        ))}
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


            </div>

        </>


    )
}


export default HomePage