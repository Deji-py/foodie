import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'


import CategoryCard from './CategoryCard'
import { useLoaderData, useLocation } from 'react-router-dom'
import data from '../data'

function Categories({ category }) {


    const currentRoute = useLocation()

    const route = ["food", "drinks", "snacks"]

    return (
        <div className='flex flex-col w-full justify-start overflow-x-hidden items-start md:items-center mt-10'>
            <p >Categories</p>
            <div className=' overflow-x-scroll w-full'>

                <div className='flex flex-row  w-fit  gap-3 py-2'>
                    {category.map((items, key) => (
                        <CategoryCard key={key}
                            currentRoute={currentRoute}
                            image={items.image}
                            route={items.category}
                            title={items.category} />
                    ))}
                </div>
            </div>
        </div>
    )
}



export default Categories