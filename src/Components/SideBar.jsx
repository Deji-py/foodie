import React from 'react'
import { IconButton } from "@mui/material";
import {
    MdAccountBalanceWallet,
    MdAdminPanelSettings,

    MdHome,

} from "react-icons/md";

import { BiLogOutCircle } from "react-icons/bi"
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

function SideBar({ openSideNav, setOpenSideNav, route }) {





    const MenuButton = ({ title, visible, icon, style }) => {
        return (
            <IconButton disableRipple={true} sx={{ borderRadius: 50, width: "100%", color: "white", ...style }}>
                {icon}
                {visible ? <p className="text-[0.9rem] ml-3">{title}</p> : <div />}
            </IconButton>
        );
    };
    return (
        <div className='hidden fixed z-50 md:block '>
            <motion.div
                transition={{ type: "spring", stiffness: 100, duration: 0.1 }}
                animate={{
                    width: openSideNav ? "20vw" : "4vw",
                }}
                onMouseOver={() => setOpenSideNav(true)}
                className="flex flex-col h-screen gap-10 
             shadow-xl bg-secondary px-2  justify-start items-center"
            >
                <div className="h-[20%]" />
                <Link to={"/home"} className={"w-full"}>
                    <MenuButton
                        style={{
                            background: route.pathname === "/home" || route.pathname.includes("categories") ? "white" : "transparent",
                            color: route.pathname === "/home" || route.pathname.includes("categories") ? "black" : "white"
                        }}
                        title={"Home"}
                        visible={openSideNav}
                        icon={<MdHome size={25} />}
                    />
                </Link>
                <Link to={"wallet"} className={"w-full"}>
                    <MenuButton
                        style={{
                            background: route.pathname === "/wallet" ? "white" : "transparent",
                            color: route.pathname === "/wallet" ? "black" : "white"
                        }}
                        title={"Wallet"}
                        visible={openSideNav}
                        icon={<MdAccountBalanceWallet size={25} />}
                    />
                </Link>
                <Link to={"admin"} className={"w-full"}>
                    <MenuButton
                        style={{
                            background: route.pathname === "/admin" ? "white" : "transparent",
                            color: route.pathname === "/admin" ? "black" : "white"
                        }}
                        title={"Admin"}
                        visible={openSideNav}
                        icon={<MdAdminPanelSettings size={25} />}
                    />
                </Link>
                <div className='absolute bottom-20 w-full'>
                    <MenuButton
                        title={"Logout"}
                        visible={openSideNav}
                        icon={<BiLogOutCircle size={25} />
                        }
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default SideBar