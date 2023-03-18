import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'


import CategoryCard from './CategoryCard'
import { useLoaderData, useLocation } from 'react-router-dom'
import data from '../data'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase_config'

function Categories() {
    const [categories, setCategories] = useState([])
    const getCategory = async () => {
        const docRef = collection(db, "categories")
        await getDocs(docRef).then((doc) => {
            setCategories(doc.docs)
        })
    }



    useEffect(() => {
        getCategory()
    }, [])

    return (
        <div className='flex flex-col  w-full justify-start overflow-hidden items-start'>
            <p className='pl-5 p-2 text-gray-500 ' >Categories</p>
            <div className=' w-full'>
                <div className='flex px-2 overflow-x-scroll md:overflow-x-hidden flex-row w-full  gap-3 py-2'>
                    {categories.map((items, key) => (
                        <CategoryCard key={key}
                            image={items.data().image}
                            route={items.data().category}
                            title={items.data().category} />
                    ))}
                </div>
            </div>
        </div>
    )
}



export default Categories