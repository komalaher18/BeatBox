import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentSong } from "../../redux/songs";
import DeleteSongModal from "../Songs/DeleteSongModal/DeleteSongModal";
import "./SongInfo.css";
import OpenModalButton from "../OpenModalButton";

  const SongInfo = ({ id, title, genre, songUrl, songImage, userId }) => {
    const song = { id, title, genre, songUrl, songImage, userId };

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
      setIsOwner(user?.id === song.userId);
    }, [dispatch, user, song.userId]);

    const songDetailPage = (e) => {
      e.stopPropagation();
      navigate(`/songs/${id}`, { state: { song: song } });
    };

    const EditSongPage = (e, id) => {
      e.stopPropagation();
      navigate(`/songs/${id}/update`, { state: { song: song } });
    };

    const stopProp = (e) => {
      e.stopPropagation();
    };

    return (
      <div className="song-Info-container" onClick={songDetailPage}>
        <div className="songInfo-header">
          <div className="title-genre-div">
            <h3>{title}</h3>
            <span className="div-genre">{genre}</span>
          </div>
        </div>
        <div>
          <img
            src={songImage}
            alt={`${title} cover art`}
            className="song-image"
          />
        </div>
        <div className="songinfo-buttons-container">
          {isOwner && (
            <>
              <button
                className="div-buttons"
                onClick={(e) => EditSongPage(e, id)}
                // onClick={()=> navigate(`/songs/${song.id}/update`)}
                type="button"
              >
                <i className="fas fa-edit"></i>
              </button>

              <OpenModalButton
                className="sdiv-buttons"
                buttonText={
                  <i className="fas fa-trash-alt" style={{ color: "red" }}></i>
                }
                modalComponent={<DeleteSongModal song={song} />}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  export default SongInfo;
