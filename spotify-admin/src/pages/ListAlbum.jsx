import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListAlbum = () => {
  // in the state variable we will store the data in the 'data' variable which is comming from the API
  const [data, setData] = useState([]);
  // after that we will create the function
  const fetchAlbums = async () => {
    //  in this function we have to add API calls
    try {
      const response = await axios.get(`${url}/api/album/list`); // using this we will get one response where we get the array and it contains the all data

      if (response.data.success) {
        // if respose data success status is true
        // in that one we will get the all data , so we set in data state.
        // console.log(response.data)
        setData(response.data.albums); //here we set all the data in the state variable
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  // remove album function
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id }); // using this line we will delete the particular data and we get one response.
      if (response.data.success) {
        toast.success(response.data.message);
        // then we will update our all data
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occured");
      // after that we will link this function to the X icons
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image} alt="image" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour} />
              <p
                className="cursor-pointer"
                onClick={() => removeAlbum(item._id)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
