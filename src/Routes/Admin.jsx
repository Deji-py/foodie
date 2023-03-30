import React, { useContext, useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import Modal from '../Utilty/Modal'
import { arrayUnion, collection, doc, FieldValue, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import InputField from './Authentication/components/InputField'
import { db, storage } from '../firebase_config'
import { CircularProgress, Divider, IconButton, selectClasses, Switch } from '@mui/material'
import UUID from "uuid-int"
import { FaTrash } from "react-icons/fa"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { MdImage } from 'react-icons/md'
import { AuthContext } from '../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'


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

const CategoryProductsSection = ({ category, deleteItem, selectedItemIndex, setSelectedItemIndex, setOpenItemAddForm }) => {


    const Item = ({ name, image, onClick, style, deleteProduct, item }) => {
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
                    <IconButton onClick={() => deleteProduct(item?.id)} >
                        {<FaTrash size={20} />}
                    </IconButton >
                </div>
            </div >
        )
    }

    const [data, setData] = useState(null)
    const renderItems = () => {
        const docRef = doc(db, "categories/" + category)
        getDoc(docRef).then((result) => {
            setData(result.data())
        })
    }

    useEffect(() => {
        renderItems()
    }, [category, data])

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
                    <Item deleteProduct={deleteItem} item={item} onClick={() => setSelectedItemIndex(key)} style={{
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

    const { userIsAdmin } = useContext(AuthContext)

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
    const [newselectedFile, setNewSelectedFile] = useState("")
    const [newmessage, setNewMessage] = useState("")
    const [newdescription, setNewDescription] = useState("")
    const [newimage, setNewImage] = useState("")
    const [newpreview, setNewPreview] = useState("")
    const [newimageLink, setNewImageLink] = useState("")


    const id = 0
    const generator = UUID(id)
    const uuid = generator.uuid()

    const navigate = useNavigate()

    useEffect(() => {
        if (userIsAdmin) {
            return
        }
        else {
            navigate("/dashboard/categories")
        }
    }, [])


    const updateForm = () => {
        setSelectedFile("")
        setNewSelectedFile("")
        setTitle(data?.name)
        setRating(data?.rating)
        setPrice(data?.price)
        setDescription(data?.description)
        setImage(data?.image)
    }


    useEffect(() => {
        setSelectedCategory(categories[currentItem]?.category.toLowerCase())
        setData(categories[currentItem]?.list[selectedItemIndex])
        setList(categories[currentItem]?.list)
        updateForm()
    }, [categories, currentItem, selectedItemIndex, selectedCategory])




    useEffect(() => {

        updateForm()

    }, [data])


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
                rating: parseInt(rating),
                price: parseInt(price),
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
                rating: parseInt(rating),
                price: parseInt(price),
                description: description,
                image: preview,
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
                        rating: parseInt(rating),
                        price: parseInt(price),
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
            }).catch(e => {
                setMessage(e.message)
                setTimeout(() => {
                    setLoadingModalOpen(false)
                    window.location.reload(true)
                }, 1000)
            })

        }

    }


    const handleUpdateImageURL = (e) => {

        setSelectedFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }


    const handlePostImageUrl = (e) => {
        setNewSelectedFile(e.target.files[0])
        setNewPreview(URL.createObjectURL(e.target.files[0]))

    }

    const handleAddNewItem = () => {
        if (newtitle === "" || newprice === "" || newrating === "" || newdescription === "") return
        setLoadingModalOpen(true)
        setMessage("please wait")
        const docRef = doc(db, "categories", selectedCategory)
        const imageRef = ref(storage, "images/" + newselectedFile.name)

        if (newimageLink !== "") {
            const product = {
                id: uuid,
                name: newtitle,
                rating: parseInt(newrating),
                price: parseInt(newprice),
                description: newdescription,
                image: newimageLink,
                quantity: 1
            }
            updateDoc(docRef, { list: arrayUnion(product) }).then((result) => {
                setMessage("Posted")
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
            uploadBytes(imageRef, newselectedFile).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    const product = {
                        id: uuid,
                        name: newtitle,
                        rating: parseInt(newrating),
                        price: parseInt(newprice),
                        description: newdescription,
                        image: url,
                        quantity: 1
                    }

                    updateDoc(docRef, { list: arrayUnion(product) }).then((result) => {
                        setMessage("Posted")
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
            }).catch(e => {
                setMessage(e.message)
                setTimeout(() => {

                    setLoadingModalOpen(false)
                    window.location.reload(true)
                }, 1000)
            })
        }

    }


    const deleteItem = (id) => {

        const docRef = doc(db, "categories", selectedCategory)
        const listCopy = list
        const remainingItem = listCopy.filter((item) => { return item.id !== id })
        updateDoc(docRef, { list: remainingItem })

    }


    return (

        <div className=' md:p-2 pt:10 md:mt-[80px] font-medium gap-2 w-screen px-2  md:overflow-hidden h-fit md:h-[90vh] flex flex-col md:flex-row justify-start items-start'>
            <CategoriesSection setCategories={setCategories} currentItem={currentItem} setCurrentItem={setCurrentItem} />

            <CategoryProductsSection deleteItem={deleteItem} setOpenItemAddForm={setOpenItemAddForm} category={selectedCategory} selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex} />
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

                <Modal zIndex={1000} setShowModal={setLoadingModalOpen} showmodal={loadingModalOpen} >
                    <div className='bg-white absolute z-[100] flex flex-col justify-center items-center p-5 rounded-20 shadow-xl'>
                        {message === "Updated!" || "posted" ? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/512px-Eo_circle_green_checkmark.svg.png?20200417132424' className='w-[50px] h-[50px]' /> : <CircularProgress />}

                        <h2>{message}</h2>
                    </div>
                </Modal>







                <Modal zIndex={100} setShowModal={setOpenItemAddForm} showmodal={openItemAddForm}>
                    <div className='md:w-[60%] overflow-y-scroll md:pt-[50vh] pt-[200px] h-full flex flex-col justify-center items-center absolute z-50 w-full bg-gray-50 p-5 shadow-xl'>
                        <BiX size={40} className="self-start absolute top-20 " onClick={() => setOpenItemAddForm(false)} />
                        <h1>Item details</h1>
                        <div>
                            <form onSubmit={(e) => e.preventDefault()} className="md:w-[25vw] w-[80vw] ">
                                <InputField title={"Title"} onChange={(e) => setNewTitle(e.target.value)} value={newtitle} placeholder="enter title" type={"text"} />
                                <InputField title={"Rating"} onChange={(e) => setNewRating(e.target.value)} value={newrating} placeholder="rating" />
                                <InputField title={"Price"} onChange={(e) => setNewPrice(e.target.value)} value={newprice} placeholder="Price here" type={"text"} />

                                <div className='w-full flex flex-col justify-between'>
                                    <div>

                                        <p>Use link</p>
                                        <Switch onChange={(e) => setUseLink(e.target.checked)} />
                                    </div>

                                    {useLink ? (<InputField title={"image Link"} placeholder={"paste image link here"} type="text" value={newimageLink} onChange={(e) => {
                                        setNewPreview(e.target.value)
                                        setNewImageLink(e.target.value)

                                    }} />) : (
                                        <>

                                            <div className="upload-btn-wrapper " >
                                                <button className="btn border-purple-400 text-purple-500 flex flex-row justify-center items-center shadow-xl gap-2 border-2 p-3 bg-purple-100 my-5">
                                                    <MdImage size={25} /> Upload image</button>
                                                <input type="file" onChange={handlePostImageUrl} name="myfile" />
                                            </div>

                                        </>
                                    )}

                                    <img src={newpreview} className={"w-full bg-gray-400 animate h-[100px] object-cover"} />

                                </div>
                                <div className='my-5'>
                                    <h1 className='pb-2'>Description</h1>
                                    <textarea value={newdescription} onChange={(e) => setNewDescription(e.target.value)} required={true} placeholder={"enter description"}
                                        className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl "} />
                                </div>
                                <div className='my-5'>
                                    <button className='bg-black p-2 px-5 text-white' onClick={handleAddNewItem}>Add</button>
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