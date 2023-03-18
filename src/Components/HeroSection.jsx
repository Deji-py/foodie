import { Avatar, AvatarGroup } from '@mui/material'
import React from 'react'
import { MdStar } from 'react-icons/md'
import { Link } from 'react-router-dom'
import "../App.css"
import foodie from "../Assets/Images/foodiehero.png"


function HeroSection() {
    return (
        <div className='bg-gray-100 w-full font-medium h-[120vh] pb-10 md:h-[700px] overflow-hidden  flex flex-col-reverse md:flex-row justify-center items-center'>
            <div className=' flex-auto h-full md:w-full w-[80%] flex flex-col gap-[25px] justify-center items-center'>
                <h1 className='md:text-[4rem] md:text-start text-center text-[2rem] font-bold w-full md:w-[400px]'>
                    It's not just<span className='text-secondary'> food,</span> its's an Experience
                </h1>
                <p className='md:w-[400px] w-full md:px-0 px-2 md:text-start text-center text-gray-600'>We are the most fastest and reliable food delivery service in the world, Search for your Favourite food</p>
                <div className='flex flex-row w-full md:w-[400px] justify-between md:justify-start md:gap-20 my-3 items-center'>
                    <Link to={"/dashboard/categories"}>
                        <button className='p-3 px-5 bg-primary  shadow-xl shadow-purple-300 text-white rounded-xl'>
                            Order Now
                        </button>
                    </Link>
                    <button className='p-3 px-5 bg-teal-100 shadow-xl  text-teal-800 rounded-xl'>
                        About us
                    </button>
                </div>
                <div className='flex gap-3 mt-3  flex-row w-full md:w-[400px] justify-center md:justify-start items-center'>

                    <AvatarGroup>
                        <Avatar src='https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?size=626&ext=jpg&uid=R31019825&ga=GA1.2.1152281857.1676819121&semt=ais' sx={{
                            width: 30,
                            height: 30
                        }} />
                        <Avatar src='https://img.freepik.com/free-photo/close-up-shot-pretty-woman-with-perfect-teeth-dark-clean-skin-having-rest-indoors-smiling-happily-after-received-good-positive-news_273609-1248.jpg?size=626&ext=jpg&uid=R31019825&ga=GA1.1.1152281857.1676819121&semt=sph' sx={{
                            width: 30,
                            height: 30
                        }} />
                        <Avatar src='https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg?size=626&ext=jpg&uid=R31019825&ga=GA1.1.1152281857.1676819121&semt=sph' sx={{
                            width: 30,
                            height: 30
                        }} />
                        <Avatar src='https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg?size=626&ext=jpg&uid=R31019825&ga=GA1.1.1152281857.1676819121&semt=sph' sx={{
                            width: 30,
                            height: 30
                        }} />
                    </AvatarGroup>
                    <div className=' text-center text-[0.8rem]'>
                        <p>
                            500+ Happy Customers
                        </p>

                        <p className='flex mt-[2px] text-[0.75rem] font-[200] text-gray-600 flex-row justify-start items-center gap-2'>
                            <MdStar color='orange' size={15} />
                            4.8 (420 reviews)
                        </p>

                    </div>
                </div>
            </div>
            <div className='w-full md:w-[50%] px-3 flex-none md:h-full md:pt-0  pt-10  md:overflow-hidden  flex flex-col justify-center items-center'>
                <img src={foodie} alt="img" className='w-[80%]   animateRotate' />
            </div>
        </div>
    )
}

export default HeroSection