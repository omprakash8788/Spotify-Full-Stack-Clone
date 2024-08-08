import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

const SongItem = ({name, image, desc, id}) => {
  // here using the context we will get the playWithId function
  const {playWithId}=useContext(PlayerContext)
  return (
    <div onClick={()=>playWithId(id)} className="min-w-[180px] p-2 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  )
}

export default SongItem