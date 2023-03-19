import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { useStateContext } from '../context';
import axios from 'axios'
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { AiFillWarning } from 'react-icons/ai';
const CreateComplaint = () => {
  const { state } = useLocation();
  const [edit, setEdit] = useState(state ? true : false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { CreateComplaint } = useStateContext();
  const [form, setForm] = useState({
    name: state?.userName ? state.userName : '',
    description: state?.description ? state.description : '',
    title: state?.title ? state.title : '',
    target: state?.target ? state.target : '',
    date: state?.date ? new Date(state.date) : '',
    image: state?.image ? state.image : ''
  });
  const getComplaintDetail = async () => {
    try {
      debugger
      const response = await axios.get(`http://localhost:5001/getComplaint/${state.pId}`)
      setForm({ ...form, name: response.data.userName, description: response.data.description })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      setIsLoading(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const body = JSON.stringify({
        userName: form.name,
        description: form.description,
      })
      const updated = await axios.put(`http://localhost:5001/editComplaint/${state.pId}`, body, config)
      console.log(updated)

      setIsLoading(false);

      navigate('/');
    } else {


      checkIfImage(form.image, async (exists) => {
        if (exists) {
          await CreateComplaint({ ...form })
          setIsLoading(false);
          navigate('/');
        } else {
          setIsLoading(true)
          await CreateComplaint({ ...form, image: 'https://www.uwsunion.org.uk/pageassets/union/complaints/The-Union_Complaints.png?thumbnail=true&height=460&width=555&resize_type=CropToFit' })
        }
      })
    }
  }

  useEffect(() => {
    if (edit) { getComplaintDetail(); }
    return () => {
      setEdit(false)
      setForm({
        name: '',
        description: '',
        title: '',
        target: '',
        date: '',
        image: '',
      })
    }
  }, [edit])

  return (

    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}



      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">{edit ? 'Edit your ' : 'Create a '}  Complaint to City Organizers</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name (off-chain)*"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            required
            editable
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Complaint Title (on-chain)*"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            required
            editable={!edit}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Complaint in Detail (Off Chain)"
          placeholder="Write your Complaint in Detail"
          isTextArea
          value={form.description}
          required
          editable
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          {/* <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
           */}

          <AiFillWarning size={25} color='white' />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">On-Chain data cannot be edited or removed after posting.</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Service"
            placeholder="Complaint About"
            inputType="text"
            value={form.target}
            required
            editable={!edit}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="Date (on Chain)"
            placeholder="Date"
            inputType="date"
            value={form.date}
            required={edit}
            editable={!edit}
            handleChange={(e) => handleFormFieldChange('date', e)}
          />
        </div>

        <FormField
          labelName="Campaign image (optional on Chain)"
          placeholder="Place image URL of your complaint"
          inputType="url"
          value={form.image}
          notRequired
          editable={!edit}

          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title={edit ? "Save" : "Submit new complaint"}
            styles="bg-[#1dc071]"
          />
        </div>
      </form>

    </div>
  )
}

export default CreateComplaint