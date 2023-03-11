import React from 'react'
import food from "../Assets/Images/eater.png"

function Footer() {
    return (
        <div className='w-full relative bg-gray-100 text-black flex flex-col justify-center items-center  h-fit py-20 text-center '>
            <div className='w-full flex flex-col justify-center items-center '>
                <h1 className='font-bold py-5 text-[1.7rem] w-[50%] text-center '>
                    Start your food journey <span className='text-secondary'>Now</span>
                </h1>
                <button className='bg-primary py-3 px-10 rounded-xl mb-20 text-white shadow-xl shadow-purple-300'>
                    Get Started
                </button>
            </div>
            <h1 className='font-bold text-[1rem]'>
                copyright &copy; 2023
            </h1>


        </div>
    )
}

export default Footer