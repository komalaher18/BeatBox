import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreatePlaylist.css";
import * as playlistActions from "../../../redux/playlists.js";


const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [playListImageURL, setPlayListImageURL] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const userId = useSelector((state) => state.session.user.id);
  const playlists = useSelector((state) => state.playlists);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_errors = {};
    if (!title || title.trim().length === 0)
      form_errors.title = "Please include a title for playlist";

    if (!playListImageURL)
      form_errors.playListImageURL = "Please include a playlist cover image";

    if (
      playListImageURL.length > 0 &&
      !playListImageURL.match(/\.(jpeg|jpg|gif|png)$/)
    )
      form_errors.playListImageURL =
        "Image URL must end in .png, .jpg, or .jpeg";

    if (Object.keys(form_errors).length > 0) {
      setErrors(form_errors);
      return;
    }

    if (!checkPlaylistNames(title)) {
      setErrors({ title: "A playlist with that title already exists." });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("playListImage", playListImageURL);

    if (isMounted) setLoading(true);

    try {
      await dispatch(playlistActions.create_playlist_thunk(formData));
      await dispatch(playlistActions.getPlaylistsThunk());
      navigate("/playlists/all");
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
    setLoading(false);
  };

  const checkPlaylistNames = (title) => {
    return !Object.values(playlists).some(
      (playlist) => playlist.title === title
    );
  };

  const handleImageChange = (e) => {
    setPlayListImageURL(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="playlist-container">
      <h2>Create A Playlist!</h2>

      <div className="div-label">
        <label className="label-palylist">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Playlist Title"
            className="input-playlist"
          />
        </label>
      </div>
      {errors.title && <p className="error">{errors.title}</p>}

      <div className="div-label">
        <label className="label-palylist">
          Playlist Image:
          <input
            type="text"
            value={playListImageURL}
            onChange={handleImageChange}
            placeholder="Image URL"
            className="input-playlist"
          />
        </label>
      </div>
      {errors.playListImageURL && (
        <p className="error">{errors.playListImageURL}</p>
      )}

      <button
        type="submit"
        className="button-create-playlist"
        disabled={loading}
      >
        Create Playlist!
      </button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default CreatePlaylist;
