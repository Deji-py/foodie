import React from 'react'
import fastDelivery from "../Assets/Images/fastDelivery.svg"
import man from "../Assets/Images/man.svg"
import shopping from "../Assets/Images/shopping.svg"



const WeServeCard = ({ image, title }) => {
    return (
        <div className='bg-white rounded-2xl w-full md:w-[17rem] shadow-xl flex flex-col justify-center items-center h-[20rem]'>
            <img src={image} alt="img" className='w-full h-[85%]' />
            <div className='flex-auto  text-black w-full text-center text-[1.4rem] font-bold'>
                <h1>{title}</h1>
            </div>
        </div>
    )
}
function Weserve() {


    return (
        <div className='w-full my-20 flex flex-col justify-center items-center h-fit py-10 text-white bg-gradient-to-r from-primary to-secondary'>
            <p>
                <p>WHAT WE SERVE</p>
            </p>
            <h1>
                <p className=' text-[2.5rem] md:text-[3rem] font-bold w-[450px] text-center'>Your Favourite food Delivery Partner</p>
            </h1>
            <div className='flex w-full px-10 flex-col md:flex-row gap-5 justify-center py-5 items-center'>

                <WeServeCard image={fastDelivery} title={"Easy to order"} />
                <WeServeCard image={man} title={"Fastest Delivery"} />
                <WeServeCard image={shopping} title={"Best Quality"} />
            </div>
        </div>
    )
}

export default Weserve