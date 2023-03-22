import React, { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import Modal from '../Utilty/Modal'
import { collection, getDocs } from "firebase/firestore"
import InputField from './Authentication/components/InputField'
import { db } from '../firebase_config'
import { Divider } from '@mui/material'




const CategoryItem = ({ image, title }) => {
    return (
        <button className='bg-white my-2 shadow-md shadow-gray-300 flex flex-row justify-start items-center gap-5 w-full h-fit p-5'>
            <div className='flex-1 flex flex-row justify-start items-center gap-5'>
                <img src={image} at="img" className='flex-none w-[40px] h-[40px]' />
                <h1>{title}</h1>
            </div>
            <button className='bg-red-500 py-1 text-[0.8rem] text-white px-2 rounded-full'>
                Delete
            </button>

        </button>
    )
}



const CategoriesSection = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState([])

    const loadCategories = () => {
        setLoading(true)
        const docRef = collection(db, "categories")
        getDocs(docRef).then((result) => {
            let data = result.docs.map((item) => {
                return item.data()
            })
            setData(data)
            setError("")
            setLoading(false)
        }).catch(e => {
            setError(e.message)
        })

    }

    useEffect(() => {
        loadCategories()
    }, [])


    return (
        <div className=' w-full flex flex-col justify-start  items-start gap-5 md:w-[30%] overflow-y-scroll  h-full' >

            <h1 className='font-mediun font-bold ml-5 text-[1.2em] md:text-[1.2em] '>
                Categories
            </h1>
            <div className='w-full py-5 px-5'>
                <input type="text" placeholder='search Categories' className='w-full p-2 px-10 rounded-xl shadow-lg' />
                <div className='flex mt-5  flex-row justify-between w-full items-center'>
                    <div className='text-[0.8rem]'>
                        Total Categories: 3
                    </div>
                    <div>
                        <button className='bg-primary text-[0.8rem] shadow-xl text-white p-3 px-5 rounded-2xl'>Add New</button>
                    </div>
                </div>
            </div>
            <div className='w-full hidden md:block '>
                {loading ? <div className='w-full h-20 animate  bg-gray-300' /> : (
                    <>
                        {data.map((item, key) => (
                            <>
                                <CategoryItem key={key} image={item.image} title={item.category} />
                            </>
                        ))}
                    </>
                )}


                {/*tab mobile */}

                {/*---------------*/}
            </div>
            {loading ? <div className='w-full mt-3 h-20 animate  bg-gray-300' /> : (
                <div className='mb-10 md:hidden w-full flex gap-3 flex-row justify-start hideScrollbar items-center overflow-x-scroll'>
                    {data.map((item, key) => (
                        <div key={key} className=' border-b-2 border-black  h-full p-2 '>{item.category}</div>
                    ))}
                </div>
            )}


        </div>
    )
}



function Admin() {


    return (

        <div className=' p-2 pt-10 font-medium gap-2 w-screen  md:overflow-hidden h-fit md:h-[90vh] flex flex-col md:flex-row justify-start items-start'>
            <CategoriesSection />
            <div className='w-full md:w-[30%] overflow-y-scroll h-full'>
                <div>
                    <h1>Items "1.e Categories"</h1>
                    <div>
                        <input type="text" placeholder='search item' />
                    </div>
                </div>
                <div>
                    <p>Items here...</p>
                </div>
            </div>
            <div className='flex-auto customScroll hidden pt-[200px] overflow-y-scroll md:flex flex-col justify-center items-center h-full md:h-full '>
                <div className='md:w-[90%] rounded-2xl w-full bg-gray-50 h-fit p-5 shadow-xl'>
                    <h1>Item details</h1>
                    <div>
                        <form>
                            <InputField title={"Title"} placeholder="enter title" type={"text"} />
                            <InputField title={"Rating"} placeholder="rating" />
                            <InputField title={"Image"} placeholder="Image" type={"file"} />
                            <div className='my-5'>
                                <h1 className='pb-2'>Description</h1>
                                <textarea required={true} placeholder={"enter description"}
                                    className={"w-full border-[1px]  py-3 p-5 shadow-xl rounded-xl h-[300px] "} />
                            </div>
                            <div>
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='md:hidden'>
                    <Modal>
                        <div className='md:w-[80%]  h-full flex flex-col justify-center items-center absolute z-50 w-full bg-gray-50 p-5 shadow-xl'>
                            <BiX size={30} className="self-start" />
                            <h1>Item details</h1>
                            <div>
                                <form>

                                    <InputField title={"Title"} placeholder="enter title" type={"text"} />
                                    <InputField title={"Rating"} placeholder="rating" />
                                    <InputField title={"Image"} placeholder="Image" type={"file"} />
                                    <div className='my-5'>
                                        <h1 className='pb-2'>Description</h1>
                                        <textarea required={true} placeholder={"enter description"}
                                            className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl "} />
                                    </div>
                                    <div>
                                        <button>Update</button>
                                        <button>Delete</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Admin