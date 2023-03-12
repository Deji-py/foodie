import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import ItemCard from '../Utilty/ItemCard'
import { db } from '../firebase_config'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import Categories from '../Components/Categories'
import { MdError } from 'react-icons/md'
import CategoryLayout from '../Components/CategoryLayout'


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
            <Categories />
            {loading ? (
                <>

                    {
                        error === "" ? (
                            <CategoryLayout />
                        ) : (
                            <div className='flex flex-col justify-center w-full h-[70vh] items-center'>
                                <MdError size={50} className={"text-red-400 mb-5"} />
                                <p className='text-gray-600'>
                                    OOps!! Something went wrong
                                </p>
                                <p className='bg-teal-100 text-teal-800 p-2 mt-2'>Try refreshing...</p>
                            </div>
                        )
                    }
                </>

            ) : (

                <div className='flex flex-row px-2 flex-wrap justify-center md:justify-start items-center pb-5 gap-5 w-full'>

                    {category.map((item, key) => (
                        <ItemCard key={key} item={item} />
                    ))}
                    <div className='w-[250px] h-[300px] flex flex-col justify-center items-center'>
                        <Link to="/dashboard/home" className='opacity-50'>Back</Link>
                    </div>

                </div>
            )}
        </>

    )
}















export default CategoryList