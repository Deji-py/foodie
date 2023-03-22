import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import InputField from './components/InputField'
import Logo from "../../Assets/Images/salad.png"
import { motion } from "framer-motion"
import { AuthContext } from '../../Context/AuthProvider'
import { Alert, AlertTitle, Fade } from '@mui/material'
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase_config'
import { LineWave } from 'react-loader-spinner'

function Login() {

    const [opacity, setOpacity] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alertVisibility, setAlertVisibility] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const { setCurrentUser } = useContext(AuthContext)


    useEffect(() => {
        if (auth.currentUser !== null) {
            navigate("/dashboard/categories")
        }
        setOpacity(true)

    }, [])

    useEffect(() => {
        setError(false)
        setMessage("")
    }, [email, password])

    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoading(true)
        if (password === "" || email === "") {
            setLoading(false)
            setError(true)
            setMessage("Fields cannot be empty")
        }
        else {

            setPersistence(auth, browserLocalPersistence).then(() => {
                return signInWithEmailAndPassword(auth, email, password).then((data) => {
                    setCurrentUser(data.user)
                    setLoading(false)
                    navigate("/dashboard/categories")
                }).catch(e => {
                    setError(true)
                    setMessage(e.message.includes("wrong-password") ? "invalid username or password" : e.message)
                    setLoading(false)
                })
            }).catch(e => {
                console.log(e.message)
                setLoading(false)
            })

        }
    }



    return (
        <div className='bg-gray-100 overflow-y-scroll pb-10 md:pb-0 w-screen h-screen relative  flex flex-col md:flex-row-reverse justify-center md:justify-start items-center'>
            <img src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141351.jpg?w=740&t=st=1679160260~exp=1679160860~hmac=8e44e76bd97df2f8b16e0677f585e4ae85dcc114e838966690168530545dded9" alt='image' className='w-full md:hidden block h-[25%]  bg-gray-300 object-cover' />
            <div className='md:w-fit flex-auto  w-full pt-10 flex flex-col justify-center items-center'>
                <p className='text-red-500 text-[0.8rem] '>{message}</p>
                <div className='md:w-[60%] w-[90%] text-center self-center mb-2'>
                    <h1 className='font-bold text-[1.5rem] font-medium' >Welcome Back</h1>
                    <p className='text-[0.8rem]'>Login to account</p>
                </div>
                <form className='md:w-[60%] w-[90%] ' onSubmit={(e) => e.preventDefault()}>

                    <InputField title={"Email"} onChange={(e) => setEmail(e.target.value)} style={{
                        border: error ? "solid 1px red" : "solid purple 1px"
                    }} value={email} placeholder={"Eg. example@gmail.com"} type={"email"} />
                    <InputField title={"Password"} style={{
                        border: error ? "solid 1px red" : "solid purple 1px"
                    }} onChange={(e) => setPassword(e.target.value)} value={password} type={"password"} />
                </form>
                <div className='md:w-[60%] w-[90%]   flex flex-col justify-end items-center'>
                    <Link to="/login" className='text-gray-500 text-[0.8rem] self-end'>
                        Forgot Password?
                    </Link>
                </div>
                <button onClick={handleLogin} className='relative bg-gradient-to-r from-primary to-secondary overflow-hidden flex flex-row justify-center items-center shadow-xl rounded-xl h-[50px] mt-5 mb-2 text-white p-3 md:w-[60%] w-[90%] '>
                    Login
                    <LineWave
                        height="100"
                        width="100"
                        color="white"
                        ariaLabel="line-wave"
                        wrapperStyle={{ visibility: loading ? "visible" : "hidden", position: "absolute", right: 10, display: "flex", justifyContent: "center", items: "center", transform: "translateY(-12px)" }}
                        wrapperClass=""
                        visible={false}
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                    />
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
                    <Link to="/signup" className='  text-primary ml-2 font-bold ' >
                        Signup

                    </Link>
                </p>
            </div>
            <div className=' w-[60%] hidden md:flex justify-center items-center bg-black h-full'>
                <motion.div transition={{
                    duration: 5,
                    type: "keyframes"
                }} animate={{
                    opacity: opacity ? 1 : 0,
                }} className=' font-medium w-fit opacity-0   absolute z-50  h-fit flex flex-row justify-center items-center'>
                    <img src={Logo} alt="Logo" className=" w-[100px] h-[100px]" />
                    <p className='text-[4.5rem] font-bold text-white ml-5  text-transparent'>Foodie</p>
                </motion.div>
                <img src={"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className={"w-full h-full object-cover opacity-50"} />
            </div>

        </div>
    )
}

export default Login