import React from 'react'

function InputField({ value, onChange, title, type, placeholder, style }) {
    return (
        <div className='my-5'>
            <h1 className='pb-2'>{title}</h1>
            <input style={style} required={true} type={type} value={value} onChange={onChange} placeholder={placeholder}
                className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl "} />
        </div>
    )
}

export default InputField