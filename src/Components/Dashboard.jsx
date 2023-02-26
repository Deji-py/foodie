import React from 'react'
import foodieman from "../Assets/Images/foodieman.png"
import bg from "../Assets/Images/bg.jpg"


function Dashboard() {
    return (
        <div className='w-full h-full justify-start items-center relative'>
            <img src={bg} alt="foodbg" className='w-full h-full opacity-25 object-cover overflow-hidden ' />
            <div className='flex flex-row  absolute w-full h-full top-0 items-center '>

                <img src={foodieman} alt="foodieman" className='w-1/2 h-full object-contain' />
                <div>

                    <h1 className='font-extrabold text-[3rem] text-primary'>Hey!</h1>
                    <p className='text-[1.5rem] text-black'>Todays Meal Go loud Gann!!</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard