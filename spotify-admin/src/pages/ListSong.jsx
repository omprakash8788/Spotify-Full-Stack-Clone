import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {
  // here first we fetch all song data from the API.
  const [data, setData]=useState([]);
  console.log(data);
  
  

  const fetchSong=async()=>{
    // in this function we called the API  and store the data in "data" state variable
    try {
      const response = await axios.get(`${url}/api/song/list`)  // so when we hit his api we get song data
      // after that we will display the song data in the console
      // console.log(response.data)
      if(response.data.success){
        setData(response.data.songs)
      }

      
    } catch (error) {
      // console.log(error)
      toast.error("Error Occured")
      
    }
  }
  // remove songs 
  const removeSong = async(id)=>{
  //  using this id we can remove the song
  // here we can add the logic so we can remove the song from database.
  try {
    // call the API
    const response = await axios.post(`${url}/api/song/remove`,{id});
    // now we will check the response success status
    if(response.data.success){
      toast.success(response.data.message); // here item will be deleted 
      // then we refresh the list
      await fetchSong();

    }
    
  } catch (error) {
    toast.error("Error Occured")
    // after that we will link this function to p tag
    
  }

  }

  useEffect(()=>{
   fetchSong();
  },[])

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {
          data.map((item ,index)=>{
            return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt="image" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer' onClick={()=>removeSong(item._id)}>X</p>
              
              
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListSong
