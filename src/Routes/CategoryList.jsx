import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import data from '../data'
import ItemCard from '../Utilty/ItemCard'
import { db } from '../firebase_config'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { CircularProgress } from '@mui/material'


function CategoryList() {

    const params = useParams()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const loadCategory = async () => {
        setLoading(true)
        setError("")
        const docRef = doc(db, 'categories/' + params.id.toLowerCase())
        await getDoc(docRef).then((doc) => {
            setCategory(doc.data().list)
            setLoading(false)
        }).catch
            ((e) => setError(e.message.includes("offline") ? "No internet Connection" : e.message))

    }
    useEffect(
        () => {
            loadCategory()
        },
        [params.id])



    return (
        <>
            {loading ? (
                <>

                    {
                        error === "" ? (
                            <p>loading....</p>
                        ) : (
                            <p>{error}</p>
                        )
                    }
                </>

            ) : (

                <div className='flex flex-row  flex-wrap justify-center md:justify-start items-center pb-5 gap-5 w-full'>
                    {category.map((item, key) => (
                        <ItemCard key={key} item={item} />
                    ))}
                    <div className='w-[250px] h[300px] flex flex-col justify-center items-center'>
                        <Link to="/home" className='opacity-50'>Back</Link>
                    </div>

                </div>
            )}
        </>

    )
}















export default CategoryList