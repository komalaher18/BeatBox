import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllSongs.css";
import AllGenres from "../../AllGenres/AllGenres";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllSongsThunk } from "../../../redux/songs";
import * as playlistActions from "../../../redux/playlists.js";


const AllSongs = () => {
  const songs = useSelector((state) => state.songsReducer.songs_arr);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllSongsThunk()).then(() => setLoading(false));
    dispatch(playlistActions.getPlaylistsThunk());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const genreSongsMap = {};

  songs.forEach((song) => {
    const genre = song.genre;
    if (!genreSongsMap[genre]) {
      genreSongsMap[genre] = [];
    }
    genreSongsMap[genre].push(song);
  });

  const otherSongs = songs.filter((song) => !genreSongsMap[song.genre]);
  if (otherSongs.length > 0) {
    genreSongsMap["Other"] = otherSongs;
  }

  return (
    <div className="get-all-songs-main-div">
      {Object.entries(genreSongsMap).map(([genre, songs]) => (
        <div key={genre}>
          <h2
            style={{
              color: "black",
              marginLeft: "150px",
              fontSize: "26px",
              marginTop: "2px",
              marginBottom: "5px",
              textDecoration: "underline",
            }}
          >
            {genre}
          </h2>
          <AllGenres
            songs={songs}
            showAddToPlaylist={true}
            showRemove={false}
            showEditDelete={true}
          />
        </div>
      ))}
    </div>
  );
};

export default AllSongs;
