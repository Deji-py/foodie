import { Avatar, Badge, IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Logo from "../Assets/Images/salad.png"
import { MdMenu, MdOutlineShoppingCart, MdSearch } from "react-icons/md"
import { CartContext } from '../Context/CartProvider'


function Header({ setOpenCart, openCart, showCart, showMenuDrop, loggedin, showSearch }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const [showCartIcon, setShowCartIcon] = useState(false)
  const [showSearchIcon, setShowSearchIcon] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const { getAllItems } = useContext(CartContext)
  useEffect(() => {
    setShowCartIcon(showCart)
    setShowDropDown(showMenuDrop)
    setShowSearchIcon(showSearch)
    setLoggedIn(loggedin)
  }, [showCart, showMenuDrop, showSearch, loggedin])

  return (
    <div className='flex flex-row sticky top-0 z-[100] backdrop-blur-xl  bg-[rgba(243,244,246,0.8)]  justify-between items-center   py-3  pr-5 pl-3 text-[0.8rem]' >


      {showDropDown && <div className='flex md:hidden mr-3'>
        <IconButton>
          <MdMenu size={25} />
        </IconButton>
      </div>}

      <div className=' font-medium md:w-[15%]  h-full flex flex-row justify-center items-center'>
        <img src={Logo} alt="Logo" className=" w-[35px] h-[35px] md:w-[40px]" />
        <p className='text-[1.5rem] font-bold bg-gradient-to-r ml-2 from-secondary to-primary bg-clip-text text-transparent'>Foodie</p>
      </div>


      {showSearchIcon && (
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
      )}

      <div className='flex flex-row justify-evenly items-center  md:w-[30%]'>
        {loggedIn === false && <div className='hidden md:flex flex-wrap gap-5'>
          <button className={"bg-primary shadow-xl font-medium p-2 rounded-full px-10 text-white"}>Login</button>
          <button className={"bg-secondary p-2 shadow-xl font-medium rounded-full px-10 text-white"}>Signup</button>
        </div>}
        <div className='flex flex-row justify-center items-center gap-5'>

          {loggedIn && <div className='flex flex-row justify-start md:mr-0 mr-5 items-center gap-3'>
            <img className='md:w-[35px] w-[40px] h-[40px] md:h-[35px] rounded-full' src='https://img.freepik.com/free-photo/handsome-adult-male-posing_23-2148729713.jpg?w=740&t=st=1677006922~exp=1677007522~hmac=fde7d1dc20a3c88395322e973ebf47c3bb4aba7b4c2335a4c81b9685ec0caa00' />
          </div>}

          {loggedIn === false && (

            <button className={"  bg-primary p-2 md:hidden flex  shadow-xl font-medium rounded-full px-10 text-white"}>Signup</button>
          )}
        </div>

        {showCartIcon && (

          <IconButton onClick={() => setOpenCart(!openCart)} style={{

            position: "relative",
            background: "white",
            boxShadow: "2px 2px 8px lightgray"

          }}>
            {getAllItems() === 0 ? (<div />) : (
              <div className='absolute  top-0 right-0 text-white bg-primary rounded-full text-[0.6rem] w-3 h-3'>
                {getAllItems()}
              </div>
            )}

            <MdOutlineShoppingCart ShoppingCart className={"w-[25px] h-[25px] md:w-5 md:h-5"} />

          </IconButton>
        )}

      </div>


    </div>
  )
}

export default Header