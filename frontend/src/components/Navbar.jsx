import React from 'react'
import { SiDependabot } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa";


const Navbar = () => {
  return (
    <div>
       <div className="nav flex items-center justify-between  h-[100px] px-[150px]">
          <div className="logo flex items-center gap-[10px]">
            <i className='text-[50px]'><SiDependabot /></i>
            <h3 className='text-[25px] font-[700]'>SmartChat<span className='text-purple-500'> AI</span></h3>
          </div>
          <div className="user">
            <i><FaRegCircleUser/></i>
          </div>
       </div>
    </div>
  )
}

export default Navbar;