import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as plSongActions from "../../../redux/playlistSongs.js";
import { getAllSongsThunk } from "../../../redux/songs.js";
import { getPlaylistSongsThunk } from "../../../redux/playlistSongs.js";
import { getPlaylistsThunk } from "../../../redux/playlists.js";
import "./AddPlaylistSong.css"


const AddSongToPL = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songId } = useParams();
  const [playlistId, setPlaylistId] = useState(0);
  const playlists = Object.values(useSelector((state) => state.playlists));
  const songDetails = useSelector((state) => state.songsReducer.byId[songId]);
  const song = songDetails ? songDetails.title : "";

  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getPlaylistSongsThunk());
    // dispatch(getPlaylistsThunk());
  }, [dispatch]);

  const addSongToPlaylist = (e) => {
    e.preventDefault();
    if (playlistId) {
      const formData = new FormData();
      formData.append("playlistId", playlistId);
      formData.append("songId", songId);

      dispatch(plSongActions.add_song_to_pl(formData, playlistId)).then(() =>
        navigate(`/playlists/${playlistId}`)
      );
    }
  };

  return (
    <div className="add-song-to-playlist-container">
      <h1>Add Song to Playlist!</h1>
      {songDetails ? (
        <>
          <h3>Adding '{song}' to: </h3>
          <form onSubmit={addSongToPlaylist}>
            <select onChange={(e) => setPlaylistId(e.target.value)}>
              <option key={0} value={""}>
                Select A Playlist
              </option>
              {playlists.map((lst) => (
                <option key={lst.id} value={lst.id}>
                  {lst.title}
                </option>
              ))}
            </select>
            <button type="submit" className="button-add-song">
              Add Song
            </button>
          </form>
        </>
      ) : (
        <p>Loading song details...</p>
      )}
    </div>
  );
};

export default AddSongToPL;
