import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
// import { albumsData, assets, songsData } from "../assets/assets";
// 2
import {assets} from "../assets/assets";


import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = ({album}) => {
  // console.log(album);
  
  // to get the id here we use params
  const { id } = useParams();
  // console.log(id);
 
  // const AlbumData = albumsData[id];// remove this one and create state variable.
  const [albumData,setAlbumData ]=useState("");
  // after that in this albumsData we have load the albumsData, so using {id} we will find the data from the album and we will store in the albumsData state.

  // here we get the playWithId function using contextAPI
  // 1
  const {playWithId, albumsData, songsData}=useContext(PlayerContext)

  useEffect(()=>{
    albumsData.map((item)=>{
      // here we can check the id of this item is same as the paramere id {id}, 
      if(item._id===id){
        setAlbumData(item);
      }
    })

  },[])

  return albumData ?  (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b>Spotify</b>* 6,65,567 likes * <b>50 songs,</b>
            about 2 hr 45 min
          </p>
        </div>
      </div>
      {/* another div */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData.filter((item)=> item.album === album.name).map((item, index) => (
        <div
         onClick={()=>playWithId(item._id)}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">2 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  ):null
};

export default DisplayAlbum;
