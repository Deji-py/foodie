import { Avatar, CircularProgress, useStepContext } from '@mui/material'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { MdError, MdLiveTv } from 'react-icons/md'
import { Outlet, useAsyncError, useLoaderData, useLocation, useNavigate, useRouteError } from 'react-router-dom'
import Categories from '../Components/Categories'
import HeroSection from '../Components/HeroSection'
import HomeLayout from '../Components/HomeLayout'
import Weserve from '../Components/Weserve'
import { AuthContext } from '../Context/AuthProvider'
import { CartContext } from '../Context/CartProvider'
import { auth, db, storage } from '../firebase_config'
import ItemCard from '../Utilty/ItemCard'
import Modal from '../Utilty/Modal'
import { Alert } from "@mui/material"
import CategoryList from './CategoryList'
import Details from './Details'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'


const Dash = ({ name, avatar }) => {
    const { user, currentUser } = useContext(AuthContext)
    const [profileUrl, setProfileUrl] = useState(null)

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")


    useEffect(() => {
        setError(false)
    }, [profileUrl, showModal])



    useEffect(() => {
        setProfileUrl(currentUser?.photoURL)

    }, [])



    const handleUpload = (e) => {
        setLoading(true)
        let file = e.target.files[0]

        if (file.type === "image/jpeg" || file.type === "image/png") {
            setError(false)
            const ImageRef = ref(storage, "profilepics/" + file.name)
            uploadBytes(ImageRef, file).then(() => {
                getDownloadURL(ImageRef).then((url) => {
                    setProfileUrl(url)
                    setLoading(false)
                })
            }).catch(e => {
                setError(true)
                setMessage(e.message)
            })
        }
        else {
            setError(true)
            setMessage("File not supported, must be jpg or png")
            setLoading(false)
        }
    }


    const handleSetPic = () => {
        setLoading(true)
        if (profileUrl === "" || profileUrl === null) {
            setError(true)
            setLoading(false)
            setMessage("Select an Image")
        }
        else {

            updateProfile(auth.currentUser
                , {
                    photoURL: profileUrl
                }).then(() => {
                    setLoading(false)
                    setShowModal(false)

                })

        }
    }




    const date = new Date()

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (

        <div className=' w-full h-[150px]  mt-10 px-2 '>
            <div className=' bg-gradient-to-r shadow-gray-300 from-secondary gap-5 to-primary flex flex-row items-center justify-start shadow-lg  text-white rounded-2xl w-full h-full'>
                <div className='flex-1 border-r-2 flex flex-col justify-center items-center'>

                    <Avatar src={currentUser?.photoURL} onClick={() => setShowModal(true)} className='border-2 mb-2  border-white' style={{
                        width: 50,
                        height: 50,

                    }} />
                    <div className='flex flex-col justify-center items-center'>
                        Welcome Back,
                        <p>
                            {name}
                        </p>
                    </div>
                    <p className='text-[1.3rem]'>
                        {user?.displayName}
                    </p>
                </div>
                <div className='w-[30%] '>
                    <p className='bg-white text-red-600 flex p-2 w-fit h-fit rounded-full justify-center items-center'>{date.getDate()}</p>
                    <h1 className='text-[2rem]'>
                        {month[date.getMonth()]}
                    </h1>
                    <p>{date.getFullYear()}</p>
                </div>
            </div>
            <Modal showmodal={showModal} zIndex={1000}>
                <div className='z-[100] rounded-md flex flex-col justify-center items-center bg-white w-[80%] h-fit p-5 md:w-[30%]'>
                    <Alert severity={"error"} sx={{ display: error ? "block" : "none", width: "100%" }}>
                        <p className={"text-red-900"}> {message} </p>
                    </Alert>
                    <h1>Uplod Profile Image </h1>
                    {loading ? (
                        <div className="bg-gray flex flex-col justify-center items-center w-full h-[200px] relative ">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div className="bg-gray w-full h-[200px] relative ">
                            <div className="bg-[rgba(0,0,0,0.2)] flex flex-row items-center justify-center w-full h-full absolute" >
                                <div className={"relative"}>
                                    <button className='border-2 cursor-pointer border-white text-white p-2 px-5' >Upload</button>
                                    <input onChange={handleUpload} type="file" className={" opacity-0 absolute w-full h-full left-0"} />
                                </div>
                            </div>
                            <img src={profileUrl} alt="profile" className={"w-full h-full object-cover"} />
                        </div>
                    )}


                    <div className="w-full py-5 flex flex-row justify-between align-center ">
                        <button onClick={handleSetPic} className='bg-primary text-white p-2 shadow-xl rounded-md'>save</button>
                        <button onClick={() => setShowModal(false)} className="bg-red-500 text-white p-2 shadow-xl rounded-md">Not now</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

function HomePage() {


    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {

        navigate("Foods")

    }, [])





    return (
        <>
            <div className="flex-1 flex flex-col h-full  gap-5 w-full md:w-full items-center">
                <div className="w-full h-fit ">

                    <div className='flex flex-col justify-center items-center md:flex-row  md:justify-start md:flex-wrap gap-5 pb-10'>
                        <div className='w-full flex flex-col  justify-center md:justify-start gap-5 px-2 items-center '>
                            <Dash name={currentUser?.displayName} />
                            <Outlet />

                        </div>
                    </div>
                </div>
            </div>



        </>


    )
}


export default HomePage