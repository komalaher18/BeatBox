import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllSongs.css";
// import GenreSongs from "../../GenreSongs";
import AllGenres from "../../AllGenres/AllGenres";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllSongsThunk } from "../../../redux/songs";


const AllSongs = () => {
    const songs = useSelector((state) => state.songsReducer.songs_arr);
    // const songs = Object.values(allSongs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);
    const [loading, setLoading] = useState(true);

    const HIPHOP = "Hip-hop";
    const POP = "Pop";
    const EDM = "edm";
    const ROCK = "Rock";
    const OTHER = "other";

    useEffect(() => {
      const getSongs = async () => {
        dispatch(getAllSongsThunk());
        setLoading(false);
      };
      getSongs();
    }, [dispatch]);

    if (!songs) {
      return <h2>Loading...</h2>;
    }

    if (!songs || songs.length === 0) {
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
          <h2 style={{color:"black"}}>{genre}</h2>
          <AllGenres songs={songs} />
        </div>
      ))}
    </div>
  );
};



export default AllSongs;
