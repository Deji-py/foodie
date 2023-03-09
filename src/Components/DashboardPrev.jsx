import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import food2 from "../Assets/Images/food.jpg"

function DashboardPrev({ currentItemIndex, setCurrentItemIndex }) {


    const items = [
        "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?w=826&t=st=1677254414~exp=1677255014~hmac=a73c8c1dc21c7a107b73e6300a9ee61f2c6823203066253e7f4b4837d558afdb",
        "https://img.freepik.com/free-photo/grilled-beef-steak-dark-wooden-surface_1150-44344.jpg?w=826&t=st=1677254503~exp=1677255103~hmac=031e70ba9a6f5be41e944da35088c5dab9c591236cbdea092982c04504c1832d"
    ]

    return (
        <div className='w-full h-full relative flex flex-col  justify-center items-center'>
            <div className='absolute shadow-md px-5 z-10 w-full flex flex-row justify-between items-center'>
                <IconButton style={{
                    background: "#2079fd",
                    color: 'white'
                }} >
                    <MdChevronLeft />
                </IconButton>
                <IconButton style={{
                    background: "#2079fd",
                    color: 'white'
                }}>
                    <MdChevronRight />
                </IconButton>
            </div>
            <img src={items[currentItemIndex]} className={" opacity-90  w-full h-full object-cover"} />
            <div className='w-full flex flex-col justify-center items-center'>

                <div className=' flex flex-row absolute bottom-3 gap-3 '>
                    {
                        items.map((_, key) => (
                            <div key={key} style={{
                                background: key === currentItemIndex ? "#2079fd" : "white"
                            }} className='bg-white w-5 h-1 rounded-full ' />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardPrev