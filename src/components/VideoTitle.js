
function VideoTitle({title, overview}) {
  return (
    <div className="flex flex-col gap-6 items-start p-10 py-40 justify-center absolute z-20 text-white p-8">
       
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-lg w-1/2">{overview}</p>

        <div className="flex gap-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg">Play</button>
            <button className="bg-white text-black px-4 py-2 rounded-lg">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle