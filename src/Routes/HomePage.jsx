import { CircularProgress } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useAsyncError, useLoaderData, useLocation, useRouteError } from 'react-router-dom'
import Categories from '../Components/Categories'
import Dashboard from '../Components/Dashboard'
import DashboardPrev from '../Components/DashboardPrev'
import { db } from '../firebase_config'
import ItemCard from '../Utilty/ItemCard'
import CategoryList from './CategoryList'

function HomePage() {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [loading, setLoading] = useState(false)
    const [sorted, setSorted] = useState([])
    const [all, setAll] = useState([])
    const category = useLoaderData()

    const location = useLocation()

    useEffect(() => {

        const arr = []
        category.map((item) => {
            item.list.map(items => {
                arr.push(items)
            })
        })

        arr.sort((a, b) => a.name.localeCompare(b.name))
        setAll(arr)

    }, [category])




    return (
        <>

            <div className="flex-1 flex flex-col h-full gap-5 justify-center overflow-x-hidden w-screen md:w-full items-center">
                <div className="flex flex-col  justify-center items-center md:flex-row h-fit mt-5 gap-10 px-5 pl-0  md:px-10 w-full md:w-[80%] ">
                    <div className=" bg-gradient-to-r from-primary to-blue-200 shadow-lg w-full md:w-[50%] h-[30vh] rounded-xl">
                        <Dashboard />
                    </div>
                    <div className=" bg-gradient-to-b w-full md:w-[50%] h-[30vh] from-gray-800 to-black rounded-xl overflow-hidden shadow-xl">
                        <DashboardPrev
                            currentItemIndex={currentItemIndex}
                            setCurrentItemIndex={setCurrentItemIndex}
                        />
                    </div>
                </div>
                {category.length === 0 ? (
                    <CircularProgress className='absolute top-[60%]' />
                ) : (<>
                    <div className="h-fit px-0  md:px-10  w-full">
                        <Categories category={category} />
                        <div className="w-full h-fit mt-10 ">
                            {location.pathname === "/home" ? (
                                <div className='flex flex-row pl-0 px-5 md:px-0 md:justify-center justify-start items-center flex-wrap gap-5 pb-10'>
                                    {all.map((obj, key) => (

                                        <ItemCard item={obj} key={key} />
                                    ))}


                                </div>
                            ) : (
                                <div className='flex flex-row pl-0 px-5 md:px-0 md:justify-center justify-start items-center flex-wrap gap-5 pb-10'>
                                    <Outlet />
                                </div>
                            )}
                        </div>
                    </div>
                </>)}

            </div>

        </>


    )
}


export const homepageLoader = async () => {
    const categorydata = await getDocs(collection(db, "categories"))
    const data = categorydata.docs.map((i) => {
        return i.data()
    })

    return data

}

export default HomePage