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

  return (
    <div style={{ padding: "30px" }}>
      {Object.entries(groupedSongs).map(([genre, songs]) => (
        <AllGenres key={genre} genre={genre} songs={songs} />
      ))}
    </div>
  );
};
export default ManageSongs;
