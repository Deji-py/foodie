import { Avatar, Badge, IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Logo from "../Assets/Images/salad.png"
import { MdCancel, MdMenu, MdOutlineShoppingCart, MdRemove, MdSearch } from "react-icons/md"
import { CartContext } from '../Context/CartProvider'
import { BiLogOutCircle, BiX } from 'react-icons/bi'
import { CgProfile } from "react-icons/cg"
import { GrUserAdmin } from "react-icons/gr"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase_config'
import { Link, useNavigate } from 'react-router-dom'

function Header({ setOpenCart, openCart, showCart, showMenuDrop, loggedin, showSearch }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const [showCartIcon, setShowCartIcon] = useState(false)
  const [showSearchIcon, setShowSearchIcon] = useState(false)
  const [dropdown, setDropdown] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const { items } = useContext(CartContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    setDropdown(false)
    signOut(auth).then(() => {
      navigate("/login")
    }).then(e => console.log(e))
  }


  useEffect(() => {
    setShowCartIcon(showCart)
    setShowDropDown(showMenuDrop)
    setShowSearchIcon(showSearch)
    setLoggedIn(loggedin)
  }, [showCart, showMenuDrop, showSearch, loggedin])

  return (
    <div className='flex flex-row sticky top-0 z-[100] backdrop-blur-xl  bg-[rgba(243,244,246,0.8)]  justify-between items-center   py-3  pr-5 md:pr-20 pl-3 text-[0.8rem]' >

      {showDropDown && <div className=' md:hidden block'>

        {dropdown ? <IconButton> <MdMenu size={25} onClick={() => setDropdown(false)} /></IconButton> : <IconButton> <BiX size={25} onClick={() => setDropdown(true)} /></IconButton>}
        {(dropdown === false) && <div className='absolute text-start rounded-xl text-[0.8rem] bg-white shadow-xl shadow-[#00000048] p-2 top-[50px] w-[40vw] left-5 '>
          <ol>
            <li className='flex flex-row justify-start items-center gap-2 p-2 cursor-pointer' onClick={() => setDropdown(true)}><CgProfile />Edit profile</li>
            <li className='flex flex-row justify-start items-center gap-2 p-2 cursor-pointer' onClick={() => setDropdown(true)}><GrUserAdmin />View as Admin</li>
            <li className='flex flex-row justify-start items-center gap-2 p-2 cursor-pointer' onClick={handleLogout}><BiLogOutCircle />Logout</li>
          </ol>
        </div>}
      </div>}




      <div className=' font-medium md:w-[15%]  h-full flex flex-row justify-center items-center'>
        <img src={Logo} alt="Logo" className=" w-[35px] h-[35px] md:w-[40px]" />
        <p className='text-[1.5rem] font-bold bg-gradient-to-r ml-2 from-secondary to-primary bg-clip-text text-transparent'>Foodie</p>
      </div>


      {
        showSearchIcon && (
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
        )
      }
      {
        showDropDown && <div className='hidden md:flex flex-row justify-between items-center'>
          <ol className='flex flex-row gap-20 justify-between items-center'>
            <li className='flex flex-row justify-start items-center gap-2 p-2 cursor-pointer' onClick={() => setDropdown(true)}><CgProfile />Edit profile</li>
            <li className='flex flex-row justify-start items-center gap-2 p-2 cursor-pointer' onClick={() => setDropdown(true)}><GrUserAdmin />View as Admin</li>
            <li className='flex flex-row justify-start items-center gap-2 p-2 cursor-pointer' onClick={handleLogout}><BiLogOutCircle />Logout</li>
          </ol>
        </div>
      }
      <div className='flex flex-row justify-evenly items-center'>
        {loggedIn === false && <div className='hidden md:flex flex-wrap gap-5'>
          <Link to={"/login"} className={"bg-primary shadow-xl font-medium p-2 rounded-full px-10 text-white"}>Login</Link>
          <Link to={"/signup"} className={"bg-secondary p-2 shadow-xl font-medium rounded-full px-10 text-white"}>Signup</Link>
        </div>}

        <div className='flex flex-row justify-center items-center gap-5'>

          {loggedIn === false && (

            <Link to={"/signup"} className={"bg-primary p-2 md:hidden flex  shadow-xl font-medium rounded-full px-10 text-white"}>Signup</Link >
          )}
        </div>

        {showCartIcon && (

          <IconButton onClick={() => setOpenCart(!openCart)} style={{

            position: "relative",
            background: "white",
            boxShadow: "2px 2px 8px lightgray"

          }}>
            {items.length === 0 ? (<div />) : (
              <div className='absolute  top-0 right-0 text-white bg-primary rounded-full text-[0.6rem] w-3 h-3'>
                {items.length}
              </div>
            )}
            {!openCart ? (
              <MdOutlineShoppingCart className={"w-[25px] h-[25px] text-gray-800 md:w-5 md:h-5"} />

            ) : (
              <BiX ShoppingCart className={"w-[25px] h-[25px] text-gray-800 md:w-5 md:h-5"} />
            )}

          </IconButton>
        )}

      </div>


    </div >
  )
}

export default Header