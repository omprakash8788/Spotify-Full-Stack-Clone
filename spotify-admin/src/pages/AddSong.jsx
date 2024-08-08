import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  console.log(albumData);
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // here call the API
    try {
      // in this try block we will create one form Data and in the form Data we will store the image, song, name, desc, album
      const formData = new FormData();
      formData.append("name", name); //add field name
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);
      // so we have create the form Data
      // after that we will send our form data on the backend

      // here we will add API call
      const response = await axios.post(`${url}/api/song/add`, formData); // lets open App.jsx
      if (response.data.success) {
        toast.success("Song Added");
        setName("");
        setDesc("");
        setAlbum("None");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured");
      console.log(error);
    }
    setLoading(false);
  };
  // logic for dropdown menu
  const loadAlbumData = async () => {
    try {
      // in the try block we will call the API

      const response = await axios.get(`${url}/api/album/list`); //so when we hit this url we will get the album data and store in this state variable  const [albumData, setAlbumData]=useState([]);
      if (response.data.success) {
        // console.log(response.data)
        setAlbumData(response.data.albums);
      } else {
        // if this response failed
        toast.error("Unable to load albums data");
      }
    } catch (error) {
      toast.error("Error occured");
      // Now we excute this function when component get loaded
    }
  };
  useEffect(()=>{
  loadAlbumData();
  },[])
  // after that go to select tag

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt="song"
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
        {/* other div */}
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
      </div>
      {/* other div */}
      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[400px]"
          placeholder="Type Here"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[400px]"
          placeholder="Type Here"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[150px]"
        >
          <option value="none">None</option>
         
          {albumData.map((item, index)=>(<option key={index} value={item.name}>{item.name}</option>))}
        </select>
      </div>
      <button
        type="submit"
        className="text-base mb-5 bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
