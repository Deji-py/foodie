import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'


import CategoryCard from './CategoryCard'
import { useLoaderData, useLocation } from 'react-router-dom'
import data from '../data'

function Categories({ category }) {

    return (
        <div className='flex flex-col w-full justify-start items-start'>
            <p >Categories</p>
            <div className=' w-full'>
                <div className='flex flex-row w-fit  gap-3 py-2'>
                    {category.map((items, key) => (
                        <CategoryCard key={key}
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