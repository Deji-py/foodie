import React from 'react'
import { BiX } from 'react-icons/bi'
import Modal from '../Utilty/Modal'
import InputField from './Authentication/components/InputField'

function Admin() {
    return (
        <div className='bg-red-200 p-2 font-medium gap-2 w-screen  md:overflow-hidden h-fit md:h-[90vh] flex flex-col md:flex-row justify-start items-start'>
            <div className=' w-full flex flex-col justify-start  items-start gap-5 md:w-[30%] overflow-y-scroll bg-orange-200 h-full'>
                <h1 className='font-mediun font-bold text-[1.2em] md:text-[1.5em] '>
                    Available Categories
                </h1>
                <div className='w-full'>
                    <input type="text" placeholder='search Categories' />
                    <div className='flex flex-row justify-between w-full items-center'>
                        <div>
                            Total Categories: 3
                        </div>
                        <div>
                            <button>Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                    <div>Item</div>
                </div>
            </div>
            <div className='w-full md:w-[30%] overflow-y-scroll bg-blue-300 h-full'>
                <div>
                    <h1>Items "1.e Categories"</h1>
                    <div>
                        <input type="text" placeholder='search item' />
                    </div>
                </div>
                <div>
                    <p>Items here...</p>
                </div>
            </div>
            <div className='flex-auto hidden pt-[200px] overflow-y-scroll md:flex flex-col justify-center items-center h-full md:h-full bg-green-300'>
                <div className='md:w-[90%] rounded-2xl w-full bg-gray-50 h-fit p-5 shadow-xl'>
                    <h1>Item details</h1>
                    <div>
                        <form>
                            <InputField title={"Title"} placeholder="enter title" type={"text"} />
                            <InputField title={"Rating"} placeholder="rating" />
                            <InputField title={"Image"} placeholder="Image" type={"file"} />
                            <div className='my-5'>
                                <h1 className='pb-2'>Description</h1>
                                <textarea required={true} placeholder={"enter description"}
                                    className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl h-[300px] "} />
                            </div>
                            <div>
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='md:hidden'>
                    <Modal>
                        <div className='md:w-[80%]  h-full flex flex-col justify-center items-center absolute z-50 w-full bg-gray-50 p-5 shadow-xl'>
                            <BiX size={30} className="self-start" />
                            <h1>Item details</h1>
                            <div>
                                <form>

                                    <InputField title={"Title"} placeholder="enter title" type={"text"} />
                                    <InputField title={"Rating"} placeholder="rating" />
                                    <InputField title={"Image"} placeholder="Image" type={"file"} />
                                    <div className='my-5'>
                                        <h1 className='pb-2'>Description</h1>
                                        <textarea required={true} placeholder={"enter description"}
                                            className={"w-full border-[1px] border-purple-400 py-3 p-5 shadow-xl rounded-xl "} />
                                    </div>
                                    <div>
                                        <button>Update</button>
                                        <button>Delete</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Admin