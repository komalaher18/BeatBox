import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./PlaySong.css";
import { currentSongPlay } from "../../../redux/songs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const PlaySong = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songsReducer.songs_arr);
  const currentSong = useSelector((state) => state.songsReducer.currentSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const songPlayer = useRef(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = songPlayer.current;
    if (!audio || !currentSong.songUrl) return;

    audio.src = currentSong.songUrl;
    console.log("Current song URL:", currentSong.songUrl);

    audio.play().catch((err) => {
      console.error("Playback error:", err);

    });

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong]);



  const togglePlay = () => {
    const audio = songPlayer.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const newIndex =
      currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
    dispatch(currentSongPlay(songs[newIndex]));
    console.log("Previous track index:", newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    setCurrentSongIndex(newIndex);
    dispatch(currentSongPlay(songs[newIndex]));
    console.log("Next Song:", newIndex);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    songPlayer.current.currentTime = newTime;
  };

    const handleVolumeChange = (e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      songPlayer.current.volume = newVolume;

    };


  const songDetailPage = (e, id) => {
    e.stopPropagation();
    navigate({
      pathname: `/songs/${id}`,
      state: { song: currentSong },
    });
    console.log("Navigating to song detail:", id);
  };

  // if (!currentSong.songUrl) {
  //   return <div>No song selected</div>;
  // }

  return (
    <div className="play-song-container">
      <audio ref={songPlayer} />
      <div className="play-song-buttons">
        <div className="play-next-prev">
          <FontAwesomeIcon
            icon={faStepForward}
            className="prev-next-button"
            onClick={handleNext}
          />
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className="play-pause-button"
            onClick={togglePlay}
          />
          <FontAwesomeIcon
            icon={faStepBackward}
            className="prev-next-button"
            onClick={handlePrev}
          />
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
        />
        <div
          className="volume-control"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faVolumeHigh}
            style={{ marginRight: "10px" }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <span className="play-song">
          <p
            onClick={(e) => songDetailPage(e, currentSong.id)}
            className="play-song-title"
          >
            {currentSong.title}
          </p>
        </span>
      </div>
    </div>
  );
};

export default PlaySong;
