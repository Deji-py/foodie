import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from './components/InputField'
import Logo from "../../Assets/Images/salad.png"
import { AuthContext } from '../../Context/AuthProvider'
import { Alert, AlertTitle, Fade } from '@mui/material'

function Signup() {

    const { createUser, signUpSuccessful, setSignUpSuccessful } = useContext(AuthContext)

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState("")
    const [alertVisibility, setAlertVisibility] = useState(false);


    const navigate = useNavigate()

    const handleSubmit = () => {
        if (email === "" || password === "" || firstname === "") {
            setError(true)
            setSignUpSuccessful(false)
            setAlertVisibility(false)

        }
        else {
            setError(false)
            createUser(email, password, firstname)
            setSignUpSuccessful(true)
            setAlertVisibility(true)
            navigate("/login")
        }
    }




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
                    <InputField title={"Firstname"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setFirstname(e.target.value)} value={firstname} placeholder={"Eg. John"} type={"text"} />
                    <InputField title={"Lastname"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder={"Eg. doe"} type={"text"} />
                    <InputField title={"Email"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Eg. example@gmail.com"} type={"email"} />
                    <InputField title={"Password"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setPassword(e.target.value)} value={password} type={"password"} />
                    <InputField title={"Confirm Password"} style={{
                        border: error ? "solid red 1px" : "solid purple 0.8px"

                    }} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={"password"} />
                </form>
                <button onClick={handleSubmit} className='bg-primary shadow-xl rounded-xl mt-5 mb-2 text-white p-3 md:w-[60%] w-[90%] '>
                    Signup
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
                    <Link onClick={() => setSignUpSuccessful(false)} to="/login" className='text-primary ml-2 font-bold '>
                        Login
                    </Link>
                </p>
                <Fade
                    in={alertVisibility} //Write the needed condition here to make it appear
                    timeout={{ enter: 1000, exit: 2000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                    addEndListener={() => {
                        setTimeout(() => {
                            setAlertVisibility(false)
                        }, 1000);
                    }}
                >
                    <Alert severity="success" variant="standard" className="alert absolute top-10 z-50">
                        <AlertTitle>Success</AlertTitle>
                        Registration Successful!
                    </Alert>
                </Fade>
            </div>

        </div>
    )
}

export default Signup