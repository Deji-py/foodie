import React from 'react'
import { motion } from "framer-motion"

function Modal({ setShowModal, children }) {
    return (
        <div className='absolute top-0 flex flex-col justify-center items-center left-0 w-screen h-screen '>

            {children}

            <div onClick={setShowModal} className='absolute z-10 bg-[rgba(44,44,44,0.58)] w-full h-full' />
        </div>
    )
}

export default Modal