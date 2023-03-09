import { Avatar, Badge, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import Logo from "../Assets/Images/salad.png"
import { MdMenu, MdOutlineShoppingCart, MdSearch } from "react-icons/md"
import { CartCountContext } from '../Context/cartContext'

function Header({ setOpenCart, openCart }) {

  const { cart } = useContext(CartCountContext)
  return (
    <div className='flex flex-row  bg-gray-200 justify-evenly items-center  filter backdrop-blur-lg py-3  pr-5 text-[0.8rem]' >


      {/* <IconButton>
          <MdMenu size={25} />
        </IconButton> */}
      <div className=' font-medium md:w-[15%]  h-full flex flex-row justify-center items-center'>
        <img src={Logo} alt="Logo" className=" w-[40px] h-[40px] md:w-30px" />
        <p className='text-[1.5rem] font-bold'>Foodie</p>
      </div>

      <div className=' flex-1 flex justify-center items-center px-5'>
        <div className='relative hidden md:block  md:w-[40%] w-full justify-start items-center'>
          <IconButton sx={{

            position: "absolute"
          }}>
            <MdSearch size={20} />
          </IconButton>
          <input type={"text"} className={" p-2 pl-10 font-medium  text-[0.7rem] md:text-[0.8rem] w-full rounded-2xl shadow-xl"} placeholder="What are you looking for..." />
        </div>
      </div>
      <div className='flex flex-row justify-evenly items-center  md:w-[30%]'>
        <div className='hidden md:flex flex-wrap gap-5'>
          <button className={"bg-primary shadow-xl font-medium p-2 rounded-full px-10 text-white"}>Login</button>
          <button className={"bg-secondary p-2 shadow-xl font-medium rounded-full px-10 text-white"}>Signup</button>
        </div>
        {/* <div className='flex flex-row justify-start items-center gap-3'>
          <img className='w-[30px] h-[30px] rounded-full' src='https://img.freepik.com/free-photo/handsome-adult-male-posing_23-2148729713.jpg?w=740&t=st=1677006922~exp=1677007522~hmac=fde7d1dc20a3c88395322e973ebf47c3bb4aba7b4c2335a4c81b9685ec0caa00' />
          <p className='text-[0.7rem] md:text-[0.9rem]  '>David Mike</p>
        </div> */}
        <IconButton onClick={() => setOpenCart(!openCart)} style={{

          position: "relative",

        }}>
          {cart.length === 0 ? (<div />) : (
            <div className='absolute bg-red-500 top-0 right-0 text-white rounded-full text-[0.6rem] w-3 h-3'>
              {cart.length}
            </div>
          )}

          <MdOutlineShoppingCart ShoppingCart className={"w-[25px] h-[25px] md:w-5 md:h-5"} />

        </IconButton>
      </div>


    </div>
  )
}

export default Header