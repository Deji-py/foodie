import React from 'react'

function InputField({ title, type, placeholder }) {
    return (
        <div className='my-5'>
            <h1 className='pb-2'>{title}</h1>
            <input type={type} placeholder={placeholder}
                className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl "} />
        </div>
    )
}

export default InputField