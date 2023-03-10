import { Avatar, AvatarGroup } from '@mui/material'
import React from 'react'
import { MdStar } from 'react-icons/md'
import foodie from "../Assets/Images/foodiehero.png"


function HeroSection() {
    return (
        <div className='bg-gray-100 w-full h-[100vh] md:h-[550px]  flex flex-col-reverse md:flex-row justify-center items-center'>
            <div className=' flex-auto h-full md:w-full w-[80%] flex flex-col gap-[25px] justify-center items-center'>
                <h1 className='md:text-[4rem] md:text-start text-center text-[2rem] font-bold w-full md:w-[400px]'>
                    It's not just<span className='text-secondary'> food,</span> its's an Experience
                </h1>
                <p className='md:w-[400px] w-full md:px-0 px-2 md:text-start text-center text-gray-600'>We are the most fastest and reliable food delivery service in the world, Search for your Favourite food</p>
                <div className='flex flex-row w-full md:w-[400px] gap-10 justify-center md:justify-start mt-3 items-center'>
                    <button className='p-3 px-5 bg-primary  shadow-xl shadow-purple-300 text-white rounded-xl'>
                        Order Now
                    </button>
                    <button className='p-3 px-5 bg-teal-50 shadow-xl  text-secondary rounded-xl'>
                        About us
                    </button>
                </div>
                <div className='flex gap-3 mt-3 flex-row w-full md:w-[400px] justify-center md:justify-start items-center'>

                    <AvatarGroup>
                        <Avatar src='' sx={{
                            width: 30,
                            height: 30
                        }} />
                        <Avatar src='' sx={{
                            width: 30,
                            height: 30
                        }} />
                        <Avatar src='' sx={{
                            width: 30,
                            height: 30
                        }} />
                        <Avatar src='' sx={{
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
            <div className='w-full md:w-[50%] flex-none md:h-full h-[50%] flex flex-col justify-center items-center'>
                <img src={foodie} alt="img" className='w-[40em]' />
            </div>
        </div>
    )
}

export default HeroSection