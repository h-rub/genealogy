import { useEffect, useState } from "react";
import icons from "../assets/icons/icons";
// import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Add, Grid2, Note, Notepad2 } from 'iconsax-react';

function Header({
  sidebarOpen,
  setSidebarOpen,
  icon,
  nameRoute,
  nameSubRoute,
}) {
  const dispatch = useDispatch();
  const rol = sessionStorage.getItem("rol");

  useEffect(() => {
  }, []);

  return (
    <>
    <div className="w-screen relative sticky top-0 z-50">
        <nav className="bg-black py-5">
            <div className="bg-black container mx-auto flex">
            <img src={icons.nidecAllForDreams} alt='Logo' className='w-24 bg-black mr-8'/>
                <div className="bg-black flex flex-grow justify-between">
                    <div className='flex bg-black my-auto'>
                        <a href="#" className="flex bg-black hover:text-hoverTextSidebar transition duration-500 easy-in-out text-hoverTextSidebar font-semibold lg:mr-7 "><Grid2 className="bg-black mr-2" color="#ffff" size={24} /> Dashboard</a>
                        <a href="#" className="flex bg-black hover:text-hoverTextSidebar transition duration-500 easy-in-out text-white font-semibold lg:mr-7"><Notepad2 className="bg-black mr-2" color="#ffff" size={24} /> Órdenes</a>
                        <a href="#" className="flex bg-black hover:text-hoverTextSidebar transition duration-500 easy-in-out text-white font-semibold lg:mr-7"> <Add className="bg-black mr-2" color="#ffff" size={24} />Solicitudes</a>
                        
                    </div>
                    <div className='bg-black my-auto'>
                        <UserMenu align="right"  /> 
                    </div>
                </div>
            </div>

        </nav>
    </div>
    
    </>
  );
}

export default Header;