import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import pizza2 from "../Assets/Images/pizza2.png"
import { Link, useLocation, useParams } from 'react-router-dom'

function CategoryCard({ title, image, route }) {


    const [hover, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const params = useParams()
    const currentRoute = useLocation()


    useEffect(() => {

        if (route === params.id) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [params.id])




    return (
        <Link to={"categories/" + route}
            onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className='transition ease-out
         text-black hover:text-white cursor-pointer 
         shadow-none hover:shadow-xl border-2 mt-5 flex flex-col w-[10em] h-[8em] rounded-br-3xl  
         rounded-tl-3xl  rounded-xl  relative justify-center items-center'
            style={{
                background: active ? "#AD92F1" : "white" && hover ? "white" : "white",
                color: active ? "white" : "black"
            }}
        >
            <motion.div animate={{
                y: hover || active ? -25 : 0,
            }}>
                <img src={image} alt="image" style={{
                    width: 80,
                    height: 80,
                }} />
            </motion.div>
            <div>
                <p className='text-[1.3rem]'>
                    {title}
                </p>
            </div>
        </Link>

    )
}

export default CategoryCard