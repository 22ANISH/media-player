import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [musicIndex, setMusicIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicTotalLength, setMusicTotalLength] = useState("00:00");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00:00");
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef(null);

  const musicAPI = [
    {
      id: 1,
      songName: "Chasing",
      artist: "NEFFEX",
      songSrc: "/assets/songs/Chasing - NEFFEX.mp3",
      coverSrc: "/assets/images/image1.jpg",
    },
    {
      id: 2,
      songName: "AURORA - Runaway",
      artist: "Aurora Aksnes",
      songSrc: "/assets/songs/AURORA - Runaway (Lyrics).mp3",
      coverSrc: "/assets/images/image4.jpg",
    },
    {
      id: 3,
      songName: "Catch Me If I Fall",
      artist: "TEGNENT",
      songSrc: "/assets/songs/Catch Me If I Fall - NEFFEX.mp3",
      coverSrc: "/assets/images/image2.jpg",
    },
    {
      id: 4,
      songName: "Inspired (Clean)",
      artist: "NEFFEX",
      songSrc: "/assets/songs/Inspired (Clean) - NEFFEX.mp3",
      coverSrc: "/assets/images/image3.jpg",
    },
    {
      id: 5,
      songName: "Baby doll [ slowed + reverb ]",
      artist: "Kanika Kapoor",
      songSrc: "/assets/songs/Baby doll [ slowed + reverb ] __ meet bros ,Kanika Kapoor __ jr santu.mp3",
      coverSrc: "/assets/images/image5.jpg",
    },
    {
      id: 6,
      songName: "Soch (Slowed+Reverbed)",
      artist: "Hardy Sandhu",
      songSrc: "/assets/songs/SOCH(Slowed+Reverbed) __ Hardy Sandhu.webm",
      coverSrc: "/assets/images/image6.jpg",
    },
    {
      id: 7,
      songName: "Apna Bana Le",
      artist: "Arijit Singh",
      songSrc: "/assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm",
      coverSrc: "/assets/images/image7.jpg",
    },
  ];

  const vidArray = [
    "/Assets/Videos/video1.mp4",
    "/Assets/Videos/video2.mp4",
    "/Assets/Videos/video3.mp4",
    "/Assets/Videos/video4.mp4",
    "/Assets/Videos/video5.mp4",
    "/Assets/Videos/video6.mp4",
    "/Assets/Videos/video7.mp4",
  ];

  const [currentMusicDetails, setCurrentMusicDetails] = useState(musicAPI[musicIndex]);

  useEffect(() => {
    currentAudio.current.src = currentMusicDetails.songSrc;
    currentAudio.current.load(); // Ensure the new source is loaded
    if (isAudioPlaying) {
      currentAudio.current.play();
    }

    // Update background video when song changes
    setVideoIndex((prevIndex) => (prevIndex + 1) % vidArray.length);
  }, [musicIndex]);

  useEffect(() => {
    currentAudio.current.addEventListener("loadedmetadata", () => {
      let minutes = Math.floor(currentAudio.current.duration / 60);
      let seconds = Math.floor(currentAudio.current.duration % 60);
      setMusicTotalLength(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    });
  }, []);

  const handleMusicProgressBar = (e) => {
    const newTime = (e.target.value * currentAudio.current.duration) / 100;
    currentAudio.current.currentTime = newTime;
    setAudioProgress(e.target.value);
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleNextSong = () => {
    let newIndex = (musicIndex + 1) % musicAPI.length;
    setMusicIndex(newIndex);
    setCurrentMusicDetails(musicAPI[newIndex]);
    setIsAudioPlaying(true);
  };

  const handlePrevSong = () => {
    let newIndex = (musicIndex - 1 + musicAPI.length) % musicAPI.length;
    setMusicIndex(newIndex);
    setCurrentMusicDetails(musicAPI[newIndex]);
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    setMusicCurrentTime(`${currentMin}:${currentSec < 10 ? `0${currentSec}` : currentSec}`);

    let progress = (currentAudio.current.currentTime / currentAudio.current.duration) * 100;
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  return (
    <div className="container">
      <audio ref={currentAudio} onTimeUpdate={handleAudioUpdate} onEnded={handleNextSong}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className="backgroundVideo"></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className="musicPlayer">Music Player</p>
        <p className="music-Head-Name">{currentMusicDetails.songName}</p>
        <p className="music-Artist-Name">{currentMusicDetails.artist}</p>
        <img src={currentMusicDetails.coverSrc} alt="song cover" id="songAvatar" />
        <div className="musicTimerDiv">
          <p className="musicCurrentTime">{musicCurrentTime}</p>
          <p className="musicTotalLength">{musicTotalLength}</p>
        </div>
        <input
          type="range"
          className="musicProgressBar"
          value={audioProgress}
          onChange={handleMusicProgressBar}
        />
        <div className="musicControlers">
          <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
          <i
            className={`fa-solid ${isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"} playBtn`}
            onClick={handleAudioPlay}
          ></i>
          <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
        </div>
      </div>
    </div>
  );
}

export default App;
