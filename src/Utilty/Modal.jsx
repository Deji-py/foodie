import React from 'react'

function Modal(props) {
    return (
        <div className='absolute top-0 flex flex-col justify-center items-center left-0 w-screen h-screen '>
            <div className='absolute z-50'>
                {props.children}
            </div>
            <div className='absolute z-10 bg-[rgba(44,44,44,0.58)] w-full h-full' />
        </div>
    )
}

export default Modal