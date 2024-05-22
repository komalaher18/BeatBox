import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GetPlaylists.css";
import * as playlistActions from "../../../redux/playlists.js";
import OpenModalButton from "../../OpenModalButton";
import DeletePlaylistModal from "../DeletePlayList/DeletePlayListModal";



const Playlists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(playlistActions.getPlaylistsThunk());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const playlists = Object.values(useSelector((state) => state.playlists));

  const handleCreatePlaylist = () => {
    navigate("/playlists/new");
  };

 const handleDeletePlaylist = (playlistId) => {
   dispatch(deletePlaylistThunk(playlistId));
 };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="get-playlists-container">
      <div className="header">
        <h2 className="playlist-header">My Playlists</h2>
        <button onClick={handleCreatePlaylist} className="button-createPlaylist">
          Create Playlist
        </button>
      </div>
      <hr className="playlist"></hr>

      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist-item">
          <div
            onClick={() => navigate(`/playlists/${playlist.id}`)}
            className="div-palylist"
          >
            <img
              src={playlist.playListImage}
              alt={`${playlist.title} cover`}
              className="playlist-cover-image"
            />
            <div className="playlist-title">{playlist.title}</div>
          </div>
          <OpenModalButton
            className="delete-playlist-button"
            buttonText="Delete"
            modalComponent={
              <DeletePlaylistModal
                playlist={playlist}
                onDelete={() => handleDeletePlaylist(playlist.id)}
              />
            }
          />

          <hr className="playlist"></hr>
        </div>
      ))}
    </div>
  );
};

export default Playlists;
