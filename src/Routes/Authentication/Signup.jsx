import React from 'react'
import { Link } from 'react-router-dom'
import InputField from './components/InputField'
import Logo from "../../Assets/Images/salad.png"

function Signup() {
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
                    <InputField title={"Firstname"} placeholder={"Eg. John"} type={"text"} />
                    <InputField title={"Lastname"} placeholder={"Eg. doe"} type={"text"} />
                    <InputField title={"Email"} placeholder={"Eg. example@gmail.com"} type={"email"} />
                    <InputField title={"Password"} type={"password"} />
                    <InputField title={"Confirm Password"} type={"password"} />
                </form>
                <button className='bg-primary shadow-xl rounded-xl mt-5 mb-2 text-white p-3 md:w-[60%] w-[90%] '>
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
                    <Link to="/login" className='text-primary ml-2 font-bold '>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup