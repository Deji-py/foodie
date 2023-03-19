

import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import Cart from "../Components/Cart";
import Header from "../Components/Header.jsx";
import SideBar from "../Components/SideBar";
import AuthProvider, { AuthContext } from "../Context/AuthProvider";
import CartProvider from "../Context/CartProvider";
import { auth } from "../firebase_config";


function Dashboard() {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const { currentUser } = useContext(AuthContext)

    const route = useLocation();
    const navigate = useNavigate();


    return (

        <CartProvider>

            <div
                className=" font-medium w-full overflow-y-hidden flex  flex-row "

            >
                <div
                    className="flex-1 h-screen overflow-y-scroll bg-gray-100 "
                    onMouseOver={() => setOpenSideNav(false)}
                >
                    <Header showMenuDrop={true} loggedin={true} showCart={true} setOpenCart={setOpenCart} openCart={openCart} />
                    <div className=" flex px-0 md:px-20  flex-row h-fit w-full">
                        <Outlet />
                        <Cart openCart={openCart} setOpenCart={setOpenCart} />
                    </div>
                </div>
            </div>
        </CartProvider>

    )
}

export default Dashboard