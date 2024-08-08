import { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  // here we will use useContext hooks to access the context
  const { audioRef, track, songsData } = useContext(PlayerContext);
  // Now we will link this audioRef to audio tag
  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio ref={audioRef} src={track?track.file : ""} preload="auto"></audio>
    </div>
  );
};

export default App;
