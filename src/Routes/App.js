import { Card, IconButton } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header.jsx";
import HeroSection from "../Components/HeroSection";
import SideBar from "../Components/SideBar";
import Weserve from "../Components/Weserve";

function App() {
  return (
    <div>
      <Header loggedin={false} />
      <HeroSection />
      <Weserve />
      <Footer />
    </div>
  );
}

export default App;
