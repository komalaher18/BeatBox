import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as plSongActions from "../../redux/playlistSongs.js";
import { getAllSongsThunk } from "../../redux/songs";
import "./AddSongToPlaylistModal.css"



const AddSongToPlaylistModal = (props) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const songId = props.props.songId;
  const [playlistId, setPlaylistId] = useState(0);
  const playlists = Object.values(useSelector((state) => state.playlists));
  const songDetails = useSelector((state) => state.songsReducer.byId[songId]);
  const song = songDetails ? songDetails.title : "";

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);

  const addSongToPlaylist = (e) => {
    e.preventDefault();
    if (playlistId) {
      const formData = new FormData();
      formData.append("playlistId", playlistId);
      formData.append("songId", songId);

      dispatch(plSongActions.add_song_to_pl(formData, playlistId)).then(() => {
        closeModal();
        navigate(`/playlists/${playlistId}`);
      });
    }
  };

  return (
    <div className="add-song-to-playlist-modal">
      <h2>Add Song to Playlist</h2>
      {songDetails ? (
        <>
          <h3>Adding '{song}' to: </h3>
          <form
            className="add-song-to-playlist-form"
            onSubmit={addSongToPlaylist}
          >
            <select
              className="add-song-to-playlist-form-select"
              onChange={(e) => setPlaylistId(e.target.value)}
            >
              <option key={0} value={""} style={{ fontSize: "20px" }}>
                Select A Playlist
              </option>
              {playlists.map((lst) => (
                <option key={lst.id} value={lst.id}>
                  {lst.title}
                </option>
              ))}
            </select>
            <button type="submit">Add Song</button>
          </form>
        </>
      ) : (
        <p>Loading song details...</p>
      )}
    </div>
  );
};

export default AddSongToPlaylistModal;
