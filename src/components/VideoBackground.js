
const VideoBackground = ({ trailerUrl }) => {
  if (!trailerUrl) return <div className="w-screen h-screen bg-black"></div>;

  return (
    <div className="w-screen h-screen absolute top-0 left-0 -z-10 overflow-hidden bg-black pointer-events-none">
      
      {/* The glorious, native, perfectly behaved HTML5 Video Tag */}
      <video
        autoPlay
        loop
        muted
        playsInline // Crucial for autoplaying on iOS/Mobile
        className="w-full h-full scale-135" // object-cover acts exactly like background-size: cover
      >
        <source src={trailerUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* The dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
    </div>
  );
};

export default VideoBackground;