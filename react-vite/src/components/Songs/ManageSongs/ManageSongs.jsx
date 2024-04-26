import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllGenres from "../../AllGenres/AllGenres";
import { getCurrentUserSongsThunk } from "../../../redux/songs";
import "./ManageSongs.css";
import { useNavigate } from "react-router-dom";

const ManageSongs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const currentSongs = useSelector((state) => state.songsReducer.songs_arr);

  useEffect(() => {
    const getCurrentUserSongs = async () => {
      dispatch(getCurrentUserSongsThunk());
    };
    getCurrentUserSongs();
  }, [dispatch]);

  if (!user) {
    return <h2>Please log in to view your songs !!</h2>;
  }

  // Group songs by genre
  const groupedSongs = currentSongs.reduce((acc, song) => {
    if (!acc[song.genre]) {
      acc[song.genre] = [];
    }
    acc[song.genre].push(song);
    return acc;
  }, {});

  const userHasNoSongs = !currentSongs || currentSongs.length === 0;


  return (
    <div className="manage-songs-container">
      {userHasNoSongs ? (
        <div className="no-songs-message">
          <h2>You have no songs uploaded yet!</h2>
          <button onClick={() => navigate("/songs/new")}>
            Upload your first song
          </button>
        </div>
      ) : (
        Object.entries(groupedSongs).map(([genre, songs]) => (
          <AllGenres key={genre} genre={genre} songs={songs} />
        ))
      )}
    </div>
  );
};
export default ManageSongs;
