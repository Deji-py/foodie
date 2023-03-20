import React from 'react'

function About() {
    return (
        <div className='bg-gray-100 pt-10 font-medium h-screen px-5 w-screenn flex flex-col justify-start items-start'>
            <h1 className='text-[2rem] font-bold text-primary'>About us</h1>
            <p className='text-gray-400'>
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Id iusto nihil animi
                repudiandae labore cumque autem non blanditiis
                quaerat alias quo deserunt ducimus voluptates
                reprehenderit eius omnis, hic accusantium? Quod?
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Id iusto nihil animi
                repudiandae labore cumque autem non blanditiis
                quaerat alias quo deserunt ducimus voluptates
                reprehenderit eius omnis, hic accusantium? Quod?
            </p>
            <div>
                <h1 className='text-[1.5rem] text-primary mt-10'>- Our contact -</h1>
                <div>
                    <h2 className='mt-5'>
                        <span className='text-gray-600 font-bold font-medium'>
                            Address:
                        </span>
                        <ol>
                            <li className='text-gray-500'>3, Ajanaku street, off tower palace</li>
                        </ol>
                    </h2>
                    <h2 className='mt-5'><span>
                        phone numbers:
                    </span>
                        <ol className='text-gray-500 mt-2'>
                            <li>  +234-708745324</li>
                            <li>  +234-708745324</li>
                        </ol>

                    </h2>
                </div>
            </div>
            <div>
                <h1 className='text-primary font-bold font-medium mt-10'>Our Socials</h1>
                <div className='flex flex-row gap-5 mt-5'>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png?20210818083032" className='w-[25px] h-[25px]' />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/512px-Twitter-logo.svg.png?20220821125553" className='w-[25px] h-[25px]' />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622" className='w-[25px] h-[25px]' />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png?20140125013055" className='w-[25px] h-[25px]' />
                </div>
            </div>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png?20140125013055" className='w-[25px] h-[25px]' />

            </div>
        </div>
    )
}

export default About