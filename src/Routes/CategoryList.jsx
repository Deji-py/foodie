import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { CartCountContext } from '../Context/cartContext'
import data from '../data'
import ItemCard from '../Utilty/ItemCard'
import { db } from '../firebase_config'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { CircularProgress } from '@mui/material'


function CategoryList() {

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const category = useLoaderData()





    return (
        <>
            <div className='flex flex-row  flex-wrap justify-start md:justify-center items-center pb-5 gap-5 w-screen'>

                {category.list.map((item, key) => (
                    <ItemCard key={key} item={item} />
                ))}
                <div className='w-[250px] h[300px] flex flex-col justify-center items-center'>
                    <p>Load More</p>
                </div>

            </div>
        </>

    )
}





export const categoryLoader = async ({ params }) => {
    const docRef = doc(db, 'categories/' + params.id.toLowerCase())
    const document = await getDoc(docRef)
    return document.data()
}










export default CategoryList