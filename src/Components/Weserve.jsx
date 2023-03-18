import React from 'react'
import fastDelivery from "../Assets/Images/fastDelivery.svg"
import man from "../Assets/Images/man.svg"
import food from "../Assets/Images/foodiehero.png"

import shopping from "../Assets/Images/shopping.svg"



const WeServeCard = ({ image, title }) => {
    return (
        <div className='bg-[rgba(255,255,255,0.3)] flex-none border-2 border-[rgba(255,255,255,0.5)] shadow-[#0000006b] backdrop-blur-xl rounded-3xl w-full md:w-[30rem] mt-10 md:mt-0 md:mx-5 shadow-2xl flex flex-col justify-center items-center h-fit'>
            <img src={image} alt="img" className='w-full h-[200px] my-5' />
            <div className=' flex-auto py-5 text-white w-full text-center text-[2rem] font-bold'>
                <h1>{title}</h1>
            </div>
        </div>
    )
}
function Weserve() {


    return (
        <div className='w-full  flex flex-col relative justify-center items-center overflow-hidden h-fit py-10 text-white bg-gradient-to-br from-secondary to-primary'>
            <img src={food} alt="img" className=' opacity-10 absolute  w-full h-[100%] object-cover md:translate-x-[200px]' />
            <p className='bg-white text-teal-500 z-20 px-10 p-2 rounded-full'>WHAT WE SERVE</p>

            <div className='w-full z-20 md:w-[450px] flex flex-col justify-center items-center text-white'>
                <h1 className=' text-[2rem] md:text-[3rem] font-bold w-[80%]  text-center'>Your Favourite food Delivery Partner</h1>
            </div>
            <div className='flex w-full px-10 flex-col md:flex-row justify-center py-5 items-center'>
                <WeServeCard image={fastDelivery} title={"Easy to order"} />
                <WeServeCard image={man} title={"Fastest Delivery"} />
                <WeServeCard image={shopping} title={"Best Quality"} />

            </div>
        </div>
    )
}

export default Weserve