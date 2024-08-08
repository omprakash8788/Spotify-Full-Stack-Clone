import Navbar from "./Navbar";
// import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
// import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { useContext} from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  // now we will get songsData from the context.
  const {songsData, albumsData} = useContext(PlayerContext)
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Features Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              image={item.image}
              desc={item.desc}
              id={item._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Features Charts</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              image={item.image}
              desc={item.desc}
              id={item._id}
            />
          ))}
        </div>
      </div>

     
    </>
  );
};

export default DisplayHome;
