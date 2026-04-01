import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"
import { useSelector } from "react-redux"

function MainContainer() {

  const movies = useSelector((store) => store.movies?.nowPlaying);
  const trailer = useSelector((store) => store.movies?.trailer)

  console.log("This is inside Main container : ", movies);
  
  if (!movies || movies.length === 0) {
    return <div className="loading">Loading Movies...</div>; 
  }
  
  return (
    <div className=" aspect-video">
        <VideoTitle title={trailer?.title} overview={trailer?.overview} />
        <VideoBackground trailerUrl={trailer?.trailerUrl} />
    </div>
  )
}

export default MainContainer