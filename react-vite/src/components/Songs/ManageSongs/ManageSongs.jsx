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

  return (
    <div style={{ padding: "30px" }}>
      <AllGenres genre="My Songs" songs={currentSongs} />
    </div>
  );
};
export default ManageSongs;