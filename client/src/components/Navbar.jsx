import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">

      <div className="w-[672px] h-[55px] rounded-[20px] bg-[#156b40] flex justify-center items-center">
        <h1>Citizen Feedback System</h1>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create a complaint' : 'Connect'}
          styles={address ? 'bg-[#156b40]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address) navigate('create-complaint')
            else connect()
          }}
        />

        
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[60px] h-[60px] rounded-[10px] bg-[#156b40] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[90%] h-[90%] object-contain" />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#156b40]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? 'Create a complaint' : 'Connect'}
              styles={address ? 'bg-[#156b40]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) navigate('create-complaint')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar