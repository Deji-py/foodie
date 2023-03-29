import React, { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import Modal from '../Utilty/Modal'
import { arrayUnion, collection, doc, FieldValue, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import InputField from './Authentication/components/InputField'
import { db, storage } from '../firebase_config'
import { CircularProgress, Divider, IconButton, selectClasses, Switch } from '@mui/material'
import { v4 } from "uuid"
import { FaTrash } from "react-icons/fa"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { MdImage } from 'react-icons/md'




const CategoryItem = ({ image, title, style, onClick }) => {
    return (
        <button onClick={onClick} style={style} className='bg-white my-2 shadow-md shadow-gray-300 flex flex-row justify-start items-center gap-5 w-full h-fit p-5'>
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



const CategoriesSection = ({ setCategories, currentItem, setCurrentItem }) => {

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
            setCategories(data)
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
        <div className=' w-full flex flex-col px-2 md:justify-start justify-center    items-start gap-5 md:w-[30%] overflow-y-scroll hideScrollbar  h-full' >

            <h1 className='font-mediun font-bold ml-5  text-[1.2em] '>
                Categories
            </h1>
            <div className='w-full py-5 md:px-5 '>
                <input type="text" placeholder='search Categories' className='w-full hidden md:block p-2 px-10 rounded-xl shadow-lg' />
                <div className='flex mt-5  flex-row justify-between items-center'>
                    <div className='text-[0.8rem]'>
                        Total Categories: 3
                    </div>
                    <div>
                        <button className='bg-black text-[0.8rem] shadow-xl text-white p-3 px-5 rounded-2xl'>Add Category</button>
                    </div>
                </div>
            </div>
            <div className='w-full hidden md:block '>
                {loading ? <div className='w-full h-5 animate  bg-gray-300' /> : (
                    <>
                        {data.map((item, key) => (
                            <>
                                <CategoryItem onClick={() => setCurrentItem(key)} style={{
                                    borderRadius: "20px",
                                    background: key === currentItem ? "#e2d6ff" : "white",
                                    border: key === currentItem ? "1px solid purple" : "1px solid transparent",
                                    transition: "ease-in-out 0.5s"
                                }} key={key} image={item.image} title={item.category} />
                            </>
                        ))}
                    </>
                )}


                {/*tab mobile */}

                {/*---------------*/}
            </div>
            {loading ? <div className='w-full mt-3 h-20 animate  bg-gray-300' /> : (
                <div className='mb-10 md:hidden px-5 w-full flex gap-3 flex-row justify-start hideScrollbar items-center overflow-x-scroll'>
                    {data.map((item, key) => (
                        <div key={key} onClick={() => setCurrentItem(key)} className=' border-b-2 border-black  h-full p-2 ' style={{
                            borderRadius: "20px",
                            background: key === currentItem ? "#e2d6ff" : "white",
                            border: key === currentItem ? "1px solid purple" : "1px solid transparent",
                            transition: "ease-in-out 0.5s"
                        }}>{item.category}</div>
                    ))}
                </div>
            )}


        </div>
    )
}

const CategoryProductsSection = ({ category, selectedItemIndex, setSelectedItemIndex, setOpenItemAddForm }) => {


    const Item = ({ name, image, onClick, style }) => {
        return (
            <div onClick={onClick} style={style} className='w-full flex flex-row p-5 shadow-xl justify-between  items-center gap-5 bg-white my-5' >
                <div className='flex flex-row justify-start items-center gap-5'>
                    <div className='w-10 h-10 '>
                        <img src={image} className="w-full h-full object-cover" />
                    </div>
                    <div >
                        <h1 >{name}</h1>
                    </div>
                </div>
                <div>
                    <IconButton >
                        {<FaTrash size={20} />}
                    </IconButton >
                </div>
            </div >
        )
    }

    const [data, setData] = useState(null)
    const renderItems = () => {
        console.log("loading")
        const docRef = doc(db, "categories/" + category)
        getDoc(docRef).then((result) => {
            setData(result.data())
        })
    }

    useEffect(() => {
        renderItems()
    }, [category])

    return (
        <div className='w-full md:w-[40%] overflow-y-scroll hideScrollbar h-full md:px-5 px-2'>
            <div>
                <h1 className='font-mediun text-gray-400 font-bold md:ml-5 text-[1.2em] md:text-[1.2em] '>
                    Products
                </h1>
                <div className='w-full py-5 md:px-5'>
                    <input type="text" placeholder='search products' className='w-full p-2 px-10 rounded-xl shadow-lg' />
                    <div className='flex mt-5  flex-row justify-between w-full items-center'>
                        <div className='text-[0.8rem]'>
                            Total products: {data?.list?.length}
                        </div>
                        <div>
                            <button onClick={() => setOpenItemAddForm(true)} className='bg-primary text-[0.8rem] shadow-xl text-white p-3 px-5 rounded-2xl'>Add New</button>
                        </div>
                    </div>

                </div>
            </div>
            <div>

                {data?.list.map((item, key) => (
                    <Item onClick={() => setSelectedItemIndex(key)} style={{
                        background: selectedItemIndex === key ? "lightgray" : "white",
                        border: selectedItemIndex === key ? "gray 2px solid" : "white 2px solid",
                        cursor: "pointer"
                    }} name={item.name} key={key} image={item.image} />
                ))}
            </div>
        </div>
    )
}



function Admin() {

    const [currentItem, setCurrentItem] = useState(0)
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const [categories, setCategories] = useState([])
    const [data, setData] = useState({})
    const [selectedCategory, setSelectedCategory] = useState("food")
    const [title, setTitle] = useState("")
    const [rating, setRating] = useState("")
    const [price, setPrice] = useState(0)
    const [selectedFile, setSelectedFile] = useState("")
    const [message, setMessage] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const [list, setList] = useState([])
    const [imageLink, setImageLink] = useState("")
    const [useLink, setUseLink] = useState(false)
    const [openItemAddForm, setOpenItemAddForm] = useState(false)
    const [loadingModalOpen, setLoadingModalOpen] = useState(false)



    //new form

    const [newtitle, setNewTitle] = useState("")
    const [newrating, setNewRating] = useState("")
    const [newprice, setNewPrice] = useState(0)
    // const [selectedFile, setSelectedFile] = useState("")
    // const [message, setMessage] = useState("")
    // const [description, setDescription] = useState("")
    // const [image, setImage] = useState("")

    const updateForm = () => {
        setTitle(data?.name)
        setRating(data?.rating)
        setPrice(data?.price)
        setDescription(data?.description)
        setImage(data?.image)
        setImageLink(image)
    }


    useEffect(() => {
        setSelectedCategory(categories[currentItem]?.category.toLowerCase())
        setData(categories[currentItem]?.list[selectedItemIndex])
        setList(categories[currentItem]?.list)
        updateForm()
    }, [categories, currentItem, selectedItemIndex])


    useEffect(() => {
        updateForm()
    }, [data, selectedItemIndex, data])


    useEffect(() => {
        setPreview(data?.image)
    }, [data])





    const updateData = () => {
        setLoadingModalOpen(true)
        setMessage("please wait")
        const imageRef = ref(storage, "images/" + selectedFile.name)
        const docRef = doc(db, "categories", selectedCategory)
        if (imageLink !== "") {
            const documentData = {
                id: data?.id,
                name: title,
                rating: rating,
                price: price,
                description: description,
                image: imageLink,
                quantity: 1
            }
            list[selectedItemIndex] = documentData
            updateDoc(docRef, { list: list }).then((result) => {
                setMessage("Updated!")
                setTimeout(() => {
                    setLoadingModalOpen(false)
                    window.location.reload(true)
                }, 1000)
            }).catch(e => {
                setMessage(e.message)
                setTimeout(() => {

                    setLoadingModalOpen(false)
                    window.location.reload(true)
                }, 1000)
            })
        }
        else if (selectedFile === "") {
            const documentData = {
                id: data?.id,
                name: title,
                rating: rating,
                price: price,
                description: description,
                image: data?.image,
                quantity: 1
            }
            list[selectedItemIndex] = documentData

            updateDoc(docRef, { list: list }).then((result) => {
                setMessage("Updated!")
                setTimeout(() => {

                    setLoadingModalOpen(false)
                    window.location.reload(true)
                }, 1000)
            }).catch(e => {
                setMessage(e.message)
                setTimeout(() => {

                    setLoadingModalOpen(false)
                    window.location.reload(true)
                }, 1000)
            })
        }
        else {

            uploadBytes(imageRef, selectedFile).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    const documentData = {
                        id: data?.id,
                        name: title,
                        rating: rating,
                        price: price,
                        description: description,
                        image: url,
                        quantity: 1
                    }
                    list[selectedItemIndex] = documentData

                    updateDoc(docRef, { list: list }).then((result) => {
                        setMessage("Updated!")
                        setTimeout(() => {

                            setLoadingModalOpen(false)
                            window.location.reload(true)
                        }, 1000)
                    }).catch(e => console.log(e))
                }).catch(e => {
                    setMessage(e.message)
                    setTimeout(() => {

                        setLoadingModalOpen(false)
                        window.location.reload(true)
                    }, 1000)
                })
            }).catch(e => console.log(e))

        }

    }


    const handleUpdateImageURL = (e) => {
        setSelectedFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }




    return (

        <div className=' md:p-2 pt:10 md:mt-[80px] font-medium gap-2 w-screen px-2  md:overflow-hidden h-fit md:h-[90vh] flex flex-col md:flex-row justify-start items-start'>
            <CategoriesSection setCategories={setCategories} currentItem={currentItem} setCurrentItem={setCurrentItem} />

            <CategoryProductsSection setOpenItemAddForm={setOpenItemAddForm} category={selectedCategory} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} />
            <div className='md:flex-auto md:customScroll  md:showScrollbar hideScrollbar  md:pt-[200px] w-full md:w-fit md:px-5 overflow-y-scroll md:flex flex-col justify-center items-center h-full md:h-full '>
                <div className='md:w-[100%] mt-10 md:mt-20 md:pt-[300px] mb-10 rounded-2xl w-full bg-gray-50 h-fit p-5 shadow-xl'>
                    <h1 className='text-[1.3rem] font-bold'>Item details</h1>

                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <InputField title={"Title"} onChange={(e) => setTitle(e.target.value)} value={title} placeholder="enter title" type={"text"} />
                            <InputField title={"Rating"} onChange={(e) => setRating(e.target.value)} value={rating} placeholder="rating" />
                            <div className='w-full relative '>
                                <p className='absolute top-[55%] text-gray-400 ml-2'>NGN</p>
                                <InputField title={"Price"} onChange={(e) => setPrice(e.target.value)} value={price} style={{ paddingLeft: 50 }} placeholder="Price here" type={"text"} />
                            </div>
                            <div className='w-full flex flex-col justify-between'>
                                <div>

                                    <p>Use link</p>
                                    <Switch onChange={(e) => setUseLink(e.target.checked)} />
                                </div>

                                {useLink ? (<InputField title={"image Link"} placeholder={"paste image link here"} type="text" value={imageLink} onChange={(e) => {
                                    setPreview(e.target.value)
                                    setImageLink(e.target.value)

                                }} />) : (
                                    <>

                                        <div className="upload-btn-wrapper " >
                                            <button className="btn border-purple-400 text-purple-500 flex flex-row justify-center items-center shadow-xl gap-2 border-2 p-3 bg-purple-100 my-5">
                                                <MdImage size={25} /> Upload image</button>
                                            <input type="file" onChange={handleUpdateImageURL} name="myfile" />
                                        </div>

                                    </>
                                )}


                            </div>
                            <img src={preview} className={"w-full bg-gray-400 animate h-[100px] object-cover"} />

                            <div className='my-5'>
                                <h1 className='pb-2'>Description</h1>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required={true} placeholder={"enter description"}
                                    className={"w-full border-[1px]  py-3 p-5 shadow-xl rounded-xl h-[300px] "} />
                            </div>
                            <div className='my-5'>
                                <button onClick={updateData} className='bg-black p-2 px-5 text-white'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>

                <Modal setShowModal={setLoadingModalOpen} showmodal={loadingModalOpen} >
                    <div className='bg-white absolute z-[100] flex flex-col justify-center items-center p-5 rounded-20 shadow-xl'>
                        {message === "Updated!" ? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/512px-Eo_circle_green_checkmark.svg.png?20200417132424' className='w-[50px] h-[50px]' /> : <CircularProgress />}

                        <h2>{message}</h2>
                    </div>
                </Modal>

                <Modal setShowModal={setOpenItemAddForm} showmodal={openItemAddForm}>
                    <div className='md:w-[80%]  h-full flex flex-col justify-center items-center absolute z-50 w-full bg-gray-50 p-5 shadow-xl'>
                        <BiX size={30} className="self-start" onClick={() => setOpenItemAddForm(false)} />
                        <h1>Item details</h1>
                        <div>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <InputField title={"Title"} value={title} placeholder="enter title" type={"text"} />
                                <InputField title={"Rating"} value={rating} placeholder="rating" />
                                <InputField title={"Price"} value={price} placeholder="Price here" type={"text"} />
                                <InputField title={"Image"} placeholder="Image" type={"file"} />
                                <div className='my-5'>
                                    <h1 className='pb-2'>Description</h1>
                                    <textarea value={description} required={true} placeholder={"enter description"}
                                        className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl "} />
                                </div>
                                <div className='my-5'>
                                    <button className='bg-black p-2 px-5 text-white'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>

    )
}

export default Admin