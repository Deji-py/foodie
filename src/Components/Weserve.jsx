import React from 'react'
import fastDelivery from "../Assets/Images/fastDelivery.svg"
import man from "../Assets/Images/man.svg"
import food from "../Assets/Images/foodiehero.png"

import shopping from "../Assets/Images/shopping.svg"



const WeServeCard = ({ image, title }) => {
    return (
        <div className='bg-[rgba(255,255,255,0.7)] shadow-[#0000006b] backdrop-blur-xl rounded-2xl w-full md:w-[17rem] mt-10 md:mt-0 md:ml-20 shadow-xl flex flex-col justify-center items-center h-[20rem]'>
            <img src={image} alt="img" className='w-full h-[85%]' />
            <div className='flex-auto  text-black w-full text-center text-[1.4rem] font-bold'>
                <h1>{title}</h1>
            </div>
        </div>
    )
}
function Weserve() {


    return (
        <div className='w-full my-20 flex flex-col relative justify-center items-center overflow-hidden h-fit py-10 text-white bg-gradient-to-br from-primary to-secondary'>
            <img src={food} alt="img" className=' opacity-50 absolute w-full h-[50%] md:h-[100%] object-cover translate-x-[200px]' />

            <p className='bg-white text-black z-20 px-10 p-2 rounded-full'>WHAT WE SERVE</p>

            <div className='w-full z-20 md:w-[450px] flex flex-col justify-center items-center'>
                <h1 className=' text-[2rem] md:text-[3rem] font-bold w-[80%] text-center'>Your Favourite food Delivery Partner</h1>
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