import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import InputField from './components/InputField'
import Logo from "../../Assets/Images/salad.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Alert, AlertTitle, Fade } from '@mui/material'
import { auth } from '../../firebase_config'
import { LineWave, MutatingDots } from 'react-loader-spinner'
import { AuthContext } from '../../Context/AuthProvider'

function Signup() {


    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [passMismatch, setPassMisMatch] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [alertVisibility, setAlertVisibility] = useState(false);

    const navigate = useNavigate()


    const handleSubmit = async () => {
        setLoading(true)
        if (email === "" || password === "" || confirmPassword === "" || firstname === "" || lastname === "") {
            setError(true)
            setAlertVisibility(true)
            setMessage("Fields cannot be empty")
            setLoading(false)
        }
        if (confirmPassword !== password) {
            setPassMisMatch(true)
            setLoading(false)
        }
        else {
            setPassMisMatch(false)
            await createUserWithEmailAndPassword(auth, email, password).then((data) => {
                //send email vrification here
                setError(false)
                setAlertVisibility(true)
                setMessage("Registration Successfull")
                setLoading(false)
                updateProfile(auth.currentUser, {
                    displayName: firstname
                }).then(() => {
                    setTimeout(() => {
                        navigate("/login")
                    }, 1000)
                })

            }).catch((e) => {
                setError(true)
                setAlertVisibility(true)
                setLoading(false)
                setMessage(e.message.includes("already-in-use") ? "Account already exist" : e.message)
            })
        }
    }


    useEffect(() => {
        setError(false)
        setPassMisMatch(false)
    }, [firstname, password, confirmPassword])


    useEffect(() => {
        if (auth.currentUser !== null) {
            navigate("/dashboard/categories")
        }
    }, [])


    return (
        <div className='bg-gray-100 w-screen h-screen overflow-y-scroll  flex flex-col justify-center items-center'>

            <div className='w-full md:w-[40%] pb-[50px] flex flex-col justify-center items-center'>
                <div className=' font-medium w-fit z-50 mt-[200px] h-fit flex flex-row justify-center items-center'>
                    <img src={Logo} alt="Logo" className=" w-[30px] h-[30px]" />
                    <p className='text-[1.5rem]  font-bold text-black ml-3'>Foodie</p>
                </div>
                <div>
                    <h1 className='text-[1.5rem] font-bold font-medium mt-5 '>Create Account</h1>
                </div>
                <form className='w-[90%] md:w-[60%]'>
                    <InputField title={"Firstname *"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setFirstname(e.target.value)} value={firstname} placeholder={"Eg. John"} type={"text"} />
                    <InputField title={"Lastname *"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder={"Eg. doe"} type={"text"} />
                    <InputField title={"Email *"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Eg. example@gmail.com"} type={"email"} />
                    <InputField title={"Password *"} style={{
                        border: error || passMismatch ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setPassword(e.target.value)} value={password} type={"password"} />
                    <InputField title={"Confirm Password *"} style={{
                        border: error || passMismatch ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={"password"} />
                    {passMismatch ? <p className='float-right  text-red-500 text-[0.8rem]'>Password Mismatch</p> : <div />}
                </form>
                <button onClick={handleSubmit} className='relative bg-gradient-to-r from-primary to-secondary overflow-hidden flex flex-row justify-center items-center shadow-xl rounded-xl h-[50px] mt-5 mb-2 text-white p-3 md:w-[60%] w-[90%] '>
                    <p>
                        Signup
                    </p>
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
                    <Link to="/login" className='text-primary ml-2 font-bold '>
                        Login

                    </Link>
                </p>
                <Fade
                    in={alertVisibility} //Write the needed condition here to make it appear
                    timeout={{ enter: 500, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                    addEndListener={() => {
                        setTimeout(() => {
                            setAlertVisibility(false)
                        }, 3000);
                    }}
                >
                    <Alert severity={error ? "error" : "success"} variant="standard" className="w-full md:w-fit rigth-0  md:right-10 absolute top-10 z-50">
                        <AlertTitle>{error ? "Signup Error" : "Signup Successful"}</AlertTitle>
                        {message}
                    </Alert>
                </Fade>
            </div>

        </div>
    )
}

export default Signup