import React from 'react';

import { tagType, thirdweb } from '../assets';
import { AiFillEdit } from 'react-icons/ai';
import { useStateContext } from '../context'
import { useNavigate } from 'react-router-dom';

const FundCard = ({ pId, owner, title, target, date, image, handleClick }) => {
  const dateTime = new Date(date).toLocaleDateString()
  const navigate = useNavigate();
  const { address } = useStateContext();

  const handleEdit = (complaint) => {
    navigate(`/edit-complaint/${complaint.title}`, { state: complaint })

  }

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer relative" >


      {address == owner && <AiFillEdit className='absolute -right-5 -top-5 rounded-full bg-[#3c3ce9] h-10 w-10 p-2' onClick={() => handleEdit({ pId, owner, title, target, date, image })} />}

      <img src={image} alt="complaint" className="w-full h-[158px] object-cover rounded-[15px]" onClick={handleClick} />

      <div className="flex flex-col p-4" onClick={handleClick}>
        <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">{target}</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">

          <div className="flex flex-col">
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Date: {dateTime}</p>
          </div>
        </div>

        {/* <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">For: <span className="text-[#b2b3bd]"></span></p>
        </div> */}
      </div>
    </div>
  )
}

export default FundCard