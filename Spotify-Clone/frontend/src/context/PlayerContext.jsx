// So in this file first we will create one context for that we will use contextApi

import { createContext, useEffect, useRef, useState } from "react";
// import { songsData } from "../assets/assets";
import axios from 'axios'

export const PlayerContext = createContext();

// After that we will create one ContextProvider function
const PlayerContextProvider = (props) => {
  

  // here we create refernce variable
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  //1. here we can do the API call
  // here we will provide backend url
  const url = 'http://localhost:4000';
  // after that we will create two state variable , for song data and album data
  // 2.
  const [songsData, setSongsData]=useState([]);
  const [albumsData, setAlbumsData]=useState([]);


  // create state variable to manage the project state
  const [track, setTrack] = useState(songsData[0]); //index 0 is our first song
  // After that we will add one more state variable to mange the player status
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

//   Now we will create the function using that we can play or pause the songs

const play=()=>{
    audioRef.current.play();
    setPlayStatus(true)
}
const pause=()=>{
    audioRef.current.pause();
    setPlayStatus(false)
}

// Logic for Play with Id
const playWithId= async(id)=>{
    // await setTrack(songsData[id]);
    // await audioRef.current.play();
    // setPlayStatus(true);
    await songsData.map((item)=>{
      if(id===item._id){
        setTrack(item);
      }
    })
    await audioRef.current.play();
    setPlayStatus(true)

}

// logic for previous song when user click that button
const previous=async()=>{
    // if(track.id>0){
    //     await setTrack(songsData[track.id-1])
    //     await audioRef.current.play()
    //     setPlayStatus(true)
    // }
    songsData.map(async(item, index)=>{
      if(track._id === item._id && index>0){
        await setTrack(songsData[index-1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }

    })
}
// logic for next song when user click that button

const next=async()=>{
    // if(track.id<songsData.length-1){
    //     await setTrack(songsData[track.id+1])
    //     await audioRef.current.play()
    //     setPlayStatus(true)
    // }

    songsData.map(async(item, index)=>{
      if(track._id === item._id && index<songsData.length){
        await setTrack(songsData[index+1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }

    })
}

// seek bar logic
const seekSong=async(e)=>{
// console.log(e);
audioRef.current.currentTime=((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)

}

// 3. 
const getSongData = async()=>{
  // here we called the API
  try {
    const response = await axios.get(`${url}/api/song/list`); //after that we will get the response
    // now we need to set response data into state variable in (in the songsData) state
    setSongsData(response.data.songs);
    setTrack(response.data.songs[0]);

    
  } catch (error) {
    console.log(error);
    
    
  }
}
// 4. similary do for albumdata
const getAlbumData = async()=>{
  try {
    const response = await axios.get(`${url}/api/album/list`);
    setAlbumsData(response.data.albums)

    
  } catch (error) {
    console.log(error)
    
  }
}

// Add logic for display time
useEffect(()=>{
    setTimeout(()=>{
       audioRef.current.ontimeupdate = ()=>{
        seekBar.current.style.width=(Math.floor(audioRef.current.currentTime / audioRef.current.duration*100)) + "%";
        setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute:Math.floor(audioRef.current.currentTime / 60)
            },
            totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute:Math.floor(audioRef.current.duration / 60)
            },
          })
       }
    },1000)
},[audioRef])

// 5.
useEffect(()=>{
  getSongData();
  getAlbumData();

},[])

  const contextValue = {
    // what ever function our state has been create we can access that in any other compnent
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong,
    // 6.
    songsData,
    albumsData
  };
  // here we create one return statement
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
