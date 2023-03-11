import React from 'react'
import "../index.css"

const LayoutCard = () => {
    return (
        <div className='bg-white w-[95%]  relative overflow-hidden flex flex-col justify-start gap-3 rounded-xl shadow-xl  items-start md:w-[300px] h-[300px]'>
            <div className='w-full animate h-[50%]'>

            </div>
            <div className='px-5  w-full'  >
                <p className='animate w-[130px] h-[15px] rounded-full'></p>
                <p className='animate w-[80%] mt-2 h-[15px] rounded-full'></p>
            </div>
            <div className='px-5 absolute bottom-5  w-full flex flex-row justify-between items-center'  >
                <p className='animate w-[130px] h-[15px] rounded-full'></p>
                <p className='animate w-[30px] h-[30px] rounded-full'></p>
            </div>
        </div>
    )
}

const CategoryLayout = () => {
    return (
        <div className='animate rounded-2xl w-[130px] h-[150px]'>

        </div>
    )
}

function HomeLayout() {

    return (
        <div className='w-screen h-fit  flex flex-col   justify-center items-center'>
            <p className='animate w-[130px] h-[15px] self-start rounded-full'></p>
            <div className='flex flex-row self-start p-5 pl-0 w-full gap-5'>
                <CategoryLayout />
                <CategoryLayout />
                <CategoryLayout />
            </div>
            <div className=' w-full h-full  gap-5 flex flex-row flex-wrap '>
                <LayoutCard />
                <LayoutCard />
                <LayoutCard />
                <LayoutCard />
                <LayoutCard />
                <LayoutCard />
            </div>
        </div>
    )
}

export default HomeLayout