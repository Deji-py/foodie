import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from './components/InputField'
import Logo from "../../Assets/Images/salad.png"
import { motion } from "framer-motion"

function Login() {

    const [opacity, setOpacity] = useState(false)

    useEffect(() => {

        setOpacity(true)

    }, [])

    return (
        <div className='bg-gray-100 w-screen h-screen relative  flex flex-row-reverse justify-center md:justify-start items-center'>

            <div className='md:w-[40%]  w-full flex flex-col justify-center items-center'>
                <div className=' font-medium w-fit translate-y-[-100%] z-50  h-fit flex flex-row justify-center items-center'>
                    <img src={Logo} alt="Logo" className=" w-[40px] h-[40px]" />
                    <p className='text-[2rem]  font-bold text-black ml-5'>Foodie</p>
                </div>
                <div className='md:w-[60%] w-[90%] mb-2'>
                    <h1 className='font-bold text-[1.3rem] font-medium' >Welcome Back</h1>
                    <p className='text-[0.8rem]'>Login to account</p>
                </div>
                <form className='md:w-[60%] w-[90%] '>
                    <InputField title={"Email"} placeholder={"Eg. example@gmail.com"} type={"email"} />
                    <InputField title={"Password"} type={"password"} />
                </form>
                <div className='md:w-[60%] w-[90%]   flex flex-col justify-end items-center'>
                    <Link to="/login" className='text-gray-500 text-[0.8rem] self-end'>
                        Forgot Password?
                    </Link>
                </div>
                <button className='bg-primary shadow-xl rounded-xl mt-10 mb-2 text-white p-3 md:w-[60%] w-[90%] '>
                    Login
                </button>
                <center>
                    -or-
                </center>
                <button className='bg-white flex flex-row justify-center items-center gap-5 font-bold  shadow-xl rounded-xl my-2 text-black p-3 md:w-[60%] w-[90%] '>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="googleLogo" className='w-[20px] h-[20px]' />
                    Continue with google
                </button>
                <p className='mt-5'>
                    Already have an account
                    <Link to="/signup" className='text-primary ml-2 font-bold '>
                        Signup
                    </Link>
                </p>
            </div>
            <div className='flex-1 hidden md:flex justify-center items-center bg-black h-full'>
                <motion.div transition={{
                    duration: 5,
                    type: "keyframes"
                }} animate={{
                    opacity: opacity ? 1 : 0,
                }} className=' font-medium w-fit opacity-0   absolute z-50  h-fit flex flex-row justify-center items-center'>
                    <img src={Logo} alt="Logo" className=" w-[100px] h-[100px]" />
                    <p className='text-[4.5rem] font-bold text-white ml-5  text-transparent'>Foodie</p>
                </motion.div>
                <img src={"https://img.freepik.com/free-photo/top-view-fried-potatoes-tasty-french-fries-with-greens-oil-dark-desk_140725-115270.jpg?size=626&ext=jpg&uid=R31019825&ga=GA1.2.1152281857.1676819121&semt=ais"} className={"w-full h-full object-cover opacity-30"} />
            </div>

        </div>
    )
}

export default Login