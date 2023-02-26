import { Card, IconButton } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import Cart from "../Components/Cart";
import Categories from "../Components/Categories";
import Dashboard from "../Components/Dashboard";
import DashboardPrev from "../Components/DashboardPrev";
import Header from "../Components/Header.jsx";
import SideBar from "../Components/SideBar";
import { CartCountContext } from "../Context/cartContext";

function App() {
  const [openSideNav, setOpenSideNav] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartCount, setCartCount] = useState(null);
  const [cart, setCart] = useState([]);
  const route = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <CartCountContext.Provider
      value={{
        cartCount: cartCount,
        setCartCount: setCartCount,
        setCart: setCart,
        cart: cart,
      }}
    >
      <Header
        setOpenCart={setOpenCart}
        openCart={openCart}
        cartCount={cartCount}
      />
      <div
        className=" font-medium overflow-hidden w-full flex flex-row bg-gray-100"
        onMouseOut={() => setOpenSideNav(false)}
      >
        <SideBar
          route={route}
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        <div
          className="flex-1 h-fit px-2 md:px-20"
          onMouseOver={() => setOpenSideNav(false)}
        >
          <div className=" flex mt-0 md:mt-10 flex-row h-fit w-full">
            <Outlet />
            <Cart openCart={openCart} setOpenCart={setOpenCart} />
          </div>
        </div>
      </div>
    </CartCountContext.Provider>
  );
}

export default App;