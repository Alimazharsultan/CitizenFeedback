import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Loader } from '../components';
import { thirdweb } from '../assets';

const ComplaintDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const createdOn = new Date(state.date).toLocaleDateString();
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState('');
  const [story, setStory] = useState('');

  const getComplaintDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/getComplaint/${state.pId}`)
      setUserName(response.data.userName)
      setStory(response.data.description)
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getComplaintDetail();
  }, [])

  return (
    <div>
      {isLoading ? <Loader /> :

        <>
          <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img src={state.image} alt="complaint" className="w-full h-[410px] object-cover rounded-xl" />

            </div>

          </div>

          <h1 className='center w-[100%] text-white text-center text-lg mt-4'>{state.title}</h1>
          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{userName}</h4>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{story}</p>
                </div>
              </div>

            </div>

            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Date</h4>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{createdOn}</p>
              <h2>{state.pId}</h2>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Complaint Related To: </h4>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.target}</p>
              <h2>{state.pId}</h2>
            </div>
          </div>
        </>
      }



    </div>
  )
}

export default ComplaintDetails