import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'

const AddAlbum = () => {
  const [image, setImage]=useState(false)
  const [colour, setColour]=useState("#121212")
  const [name, setName]=useState("");
  const [desc, setDesc]=useState("");
  const [loading, setLoading]=useState(false);
 
  // onsubmitHandler
  const onSubmitHandler = async(e)=>{
    // now we will link this function to the form tag
    e.preventDefault();
    // after that we will called the API
    // Using that we can send these data on the AddAblum API.
   setLoading(true)
    try {
      // in the try block we will create the form data
      const formData = new FormData();
      // now we will add the all data in the formData.
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append("bgColour",colour);
      // after that we have send to data on our backend.
      const response = await axios.post(`${url}/api/album/add`, formData);
      // after that check the response success status
      if(response.data.success){
        // if it is true then display one toast notification
        toast.success("Album added");
        // after that we will clear the input fields
        setDesc("");
        setImage(false);
        setName("");

      }
      else{
        //if response failed
        toast.error("Something went wrong")
      }

      
    } catch (error) {
      toast.error("Error occured")
      
    }
    setLoading(false)

  }


  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>

  </div>
  ) : (

    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
          <img src={image? URL.createObjectURL(image):assets.upload_area} className='w-24 cursor-pointer' alt="" />
        </label>
      </div>
      {/* other div */}
      <div className='flex flex-col gap-2.5'>
       <p>Album Name</p>
       <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[400px]' type="text" placeholder='Type Here' />
      </div>

       {/* other div */}
       <div className='flex flex-col gap-2.5'>
       <p>Album Description</p>
       <input onChange={(e)=>setDesc(e.target.value)} value={desc}   className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[400px]' type="text" placeholder='Type Here' />
      </div>

      {/* other div */}
      <div className='flex flex-col gap-3'>
        <p>Background Colour</p>
        <input onChange={(e)=>setColour(e.target.value)} value={colour}  type="color"/>
      </div>
      <button className='text-base mb-5 bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>ADD</button>
    </form>
  )
}

export default AddAlbum
