import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom'
import ItemCard from '../Utilty/ItemCard'
import { db } from '../firebase_config'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import Categories from '../Components/Categories'
import { MdError, MdSearch } from 'react-icons/md'
import CategoryLayout from '../Components/CategoryLayout'
import { CartContext } from '../Context/CartProvider'
import Modal from '../Utilty/Modal'
import Details from './Details'
import { IconButton } from '@mui/material'


function CategoryList() {

    const params = useParams()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDetail, setModalDetail] = useState()

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

    const { cart, addOneToCart, removeOneFromCart } = useContext(CartContext)

    return (
        <>
            <form className='w-full pt-10 sticky top-10 z-10  backdrop-blur-xl  bg-[rgba(243,244,246,0.8)]  flex-1 flex justify-center items-center px-5'>
                <div className='relative md:block  md:w-[40%] w-full h-[50px] justify-start items-center'>
                    <IconButton sx={{
                        marginTop: 0.2,
                        position: "absolute"
                    }}>
                        <MdSearch size={20} />
                    </IconButton>
                    <input type={"text"} className={" border-[0.5px] border-gray-300 p-3 pl-10 font-medium  text-[0.8rem] md:text-[0.8rem] w-full rounded-xl shadow-xl"} placeholder="What are you looking for..." />
                </div>
            </form>
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
                    <Outlet />
                </>

            ) : (

                <div className='flex flex-row  mt-10 flex-wrap justify-center md:justify-start items-center pb-5 gap-5 w-full'>
                    {category.map((item, key) => (
                        <ItemCard setModalOpen={setModalOpen} setModalDetail={setModalDetail} removeOneFromCart={() => removeOneFromCart(item)} addOneToCart={() => addOneToCart(item)} item={item} key={key} />
                    ))}

                    <Modal showmodal={modalOpen} setShowModal={() => setModalOpen(false)}>
                        <Details setModalOpen={setModalOpen} product={modalDetail} />
                    </Modal>


                </div>
            )}
        </>

    )
}















export default CategoryList