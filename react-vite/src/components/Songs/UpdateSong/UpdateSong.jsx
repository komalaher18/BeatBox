import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateSong.css"
import { UpdateSongsThunk } from "../../../redux/songs";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const UpdateSong = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location.state:", location.state);
  // console.log("song object:", location.state.song);
  console.log("song object from location.state:", location.state.song);

  const user = useSelector((state) => state.session.user);

  const song = location.state.song;


  console.log("song object in component state:", song);
  console.log("title:", song.title);
  console.log("genre:", song.genre);
  console.log("song object in component state:", song);
  const [title, setTitle] = useState(song.title);
  const [genre, setGenre] = useState(song.genre );
;
  const [songImage, setSongImage] = useState("");
  const [songUrl, setSongUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);



  console.log("title:", title);

  const HIPHOP = "Hip-hop";
  const POP = "Pop";
  const EDM = "edm";
  const ROCK = "Rock";
  const OTHER = "other";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with title:", title);

    const form_errors = {};

    if (title && title.length < 1)
      form_errors.title = "Please include a title for  song";

    if (!genre) form_errors.genre = "Please select a genre";

    if (songImage.length > 0 && !songImage.match(/\.(jpeg|jpg|gif|png)$/))
      form_errors.songImage = "Image URL must end in .png, .jpg, or .jpeg";

    if (Object.keys(form_errors).length > 0) {
      setErrors(form_errors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("songUrl", songUrl);
    formData.append("songImage", songImage);

    if (isMounted) setLoading(true);

    try {
      const result = await dispatch(UpdateSongsThunk(song.id, formData));
      const formDataTitle = formData.get("title");
      console.log("******formdata title:", formDataTitle);
      console.log("******result", result);
      if (result.ok) {
        navigate("/");
        //  navigate("/songs/current");
      } else {
        setErrors(result.data);
        setLoading(false);
        return result.data;
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
    setLoading(false);
  };

  return (
    <form className="updateSong-container" onSubmit={handleSubmit}>
      <div className="input-div">
        <label className="labels-div" htmlFor="title">
          Title
        </label>
        <input
          className="edit-form-input-text"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Song Title"
          id="title"
        />
      </div>
      {errors.title && <p className="div-error">{errors.title}</p>}

      <div className="input-div">
        <label className="labels-div" htmlFor="genre">
          Genre
        </label>
        <select
          className="edit-form-input-select"
          name="genre"
          id="genre"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value={HIPHOP}>Hip-Hop</option>
          <option value={POP}>Pop</option>
          <option value={EDM}>EDM</option>
          <option value={ROCK}>Rock</option>
        </select>
      </div>
      {errors.genre && <p className="div-error">{errors.genre}</p>}

      <div className="div-input">
        <label className="label-div" htmlFor="image">
          Song Cover Image
        </label>
        <input
          className="input-text"
          type="text"
          value={songImage}
          onChange={(e) => setSongImage(e.target.value)}
          placeholder="Image URL"
          id="image"
        />
      </div>
      {errors.songImage && <p className="div-error">{errors.songImage}</p>}

      <div className="input-div labels-div-input">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setSongUrl(e.target.files[0])}
        />
      </div>
      {errors.songUrl && <p className="div-error">{errors.songUrl}</p>}

      <button className="edit-submit-button" type="submit" disabled={loading}>
        Update Song
      </button>

      {loading && <p>Loading...</p>}
      {errors && <p className="div-error">{errors.error}</p>}
    </form>
  );
};










export default UpdateSong;
