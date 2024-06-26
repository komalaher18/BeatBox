import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewSongThunk } from "../../../redux/songs";
import "./CreateNewSong.css";

const CreateNewSong = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [errors, setErrors] = useState({});
    const [songImage, setSongImage] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);


    const HIPHOP = "Hip-hop";
    const POP = "Pop";
    const EDM = "edm";
    const ROCK = "Rock";
    const OTHER = "other";

    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
      setIsMounted(true);
      return () => setIsMounted(false);
    }, [dispatch, user.id, user, navigate]);

    const handleTitleChange = (e) => {
      setTitle(e.target.value.trim());
    };

    const handleSongImageChange = (e) => {
      setSongImage(e.target.value.trim());
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      const form_errors = {};
      if (!title || title.trim().length === 0)
        form_errors.title = "Please include a title for  song";

      if (!genre) form_errors.genre = "Please select a genre";
      if (!songImage)
        form_errors.songImage = "Please include a song cover image";

      if (songImage.length > 0 && !songImage.match(/\.(jpeg|jpg|gif|png)$/))
        form_errors.songImage = "Image URL must end in .png, .jpg, or .jpeg";

      if (!songFile)
        form_errors.songFile = "Please include a song file";


      if (Object.keys(form_errors).length > 0) {
        setErrors(form_errors);
        return;
      }

      const formData = new FormData();

      if (!songFile) {
        form_errors.songFile = "Please include a song file";
        setErrors(form_errors);
        return;
      } else {
        formData.append("songUrl", songFile);
      }
      formData.append("songUrl", songFile);
      formData.append("title", title);
      formData.append("genre", genre);
      formData.append("userId", user.id);
      formData.append("songImage", songImage);
    //   console.log("FormData:^^^^^", formData);

    if (isMounted) setLoading(true);


      try {
        const result = await dispatch(createNewSongThunk(formData));
        navigate("/songs/current/");
      } catch (error) {
        console.error("Error creating song:", error);
      }
      setLoading(false);

    };



    return (
      <form className="create-song-form" onSubmit={handleSubmit}>
        <div className="div-input">
          <label className="label-div" htmlFor="title">
            Title :
          </label>
          <input
            className="input-text"
            type="text"
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            onChange={handleTitleChange}
            placeholder="Song Title"
            id="title"
          />
        </div>
        {errors.title && <p className="div-error">{errors.title}</p>}

        <div className="div-input">
          <label className="label-div" htmlFor="genre">
            Genre :
          </label>
          <select
            className="select-div"
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value={HIPHOP}>Hip-Hop</option>
            <option value={POP}>Pop</option>
            <option value={EDM}>EDM</option>
            <option value={ROCK}>Rock</option>
            <option value={OTHER}>Other</option>
          </select>
        </div>
        {errors.genre && <p className="div-error">{errors.genre}</p>}

        <div className="div-input">
          <label className="label-div" htmlFor="image">
            Song Cover Image :
          </label>
          <input
            className="input-text"
            type="text"
            value={songImage}
            // onChange={(e) => setSongImage(e.target.value)}
            onChange={handleSongImageChange}
            placeholder="Image URL"
            id="image"
          />
        </div>
        {errors.songImage && <p className="div-error">{errors.songImage}</p>}

        <div className="div-input">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSongFile(e.target.files[0])}
          />
        </div>
        {errors.songFile && <p className="div-error">{errors.songFile}</p>}

        <button className="submit-button" type="submit" disabled={loading}>
          Upload Song
        </button>
        {loading && <p>Loading...</p>}
      </form>
    );
};



export default CreateNewSong;
