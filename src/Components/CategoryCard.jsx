import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import pizza2 from "../Assets/Images/pizza2.png"
import { Link, useLocation, useParams } from 'react-router-dom'

function CategoryCard({ title, image, route }) {


    const [hover, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const params = useParams()


    useEffect(() => {

        if (route === params.id) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [params.id])




    return (
        <Link to={"/dashboard/categories/" + route}
            onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className='transition ease-out
         text-black hover:text-white cursor-pointer 
         shadow-none hover:shadow-xl border-[0.5px] border-primary mt-5 flex flex-col w-[15em] h-[8em] rounded-br-3xl  
         rounded-tl-3xl  rounded-xl  relative justify-center items-center'
            style={{
                background: active ? "linear-gradient(60deg,#8000a7,#ef233c)" : "white" && hover ? "white" : "white",
                color: active ? "white" : "black"
            }}
        >
            <motion.div animate={{
                y: hover || active ? -25 : 0,
            }}>
                <img src={image} className={"w-[60px] md:w-[80px] h-[60px] md:h-[80px]"} alt="image" />
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