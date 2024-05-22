import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SongInfo.css";
import DeleteSongModal from "../Songs/DeleteSongModal/DeleteSongModal";
import { currentSongPlay } from "../../redux/songs";
import OpenModalButton from "../OpenModalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddSongToPlaylistModal from "../AddSongToPlaylistModal/AddSongToPlaylistModal";
import { deleteSongThunk } from "../../redux/songs";
import { add_song_to_pl } from "../../redux/playlistSongs";

  const SongInfo = ({
    id,
    title,
    genre,
    songUrl,
    songImage,
    userId,
    removeSong,
    showAddToPlaylist,
    showRemove,
    showEditDelete,
  }) => {
    const song = { id, title, genre, songUrl, songImage, userId };

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
      setIsOwner(user?.id === song.userId);
    }, [user, song.userId]);

    const playSong = (e) => {
      e.stopPropagation();
      dispatch(currentSongPlay(song));
    };

    const songDetailPage = (e) => {
      e.stopPropagation();
      navigate(`/songs/${id}`, { state: { song: song } });
    };

    const EditSongPage = (e, id) => {
      e.stopPropagation();
      navigate(`/songs/${id}/update`, { state: { song: song } });
    };

   
    return (
      <div className="song-Info-container" onClick={songDetailPage}>
        <div className="image-container">
          <img
            src={songImage}
            alt={`${title} cover art`}
            className="song-image"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="song-box-play-btn" onClick={playSong}>
              <i
                className="fas fa-play"
                style={{ color: "#ff5500", fontSize: "24px" }}
              />
            </button>
          </div>
        </div>
        <div className="songInfo-header">
          <div className="title-genre-div">
            <h3>{title}</h3>
            <span className="div-genre">{genre}</span>
          </div>
        </div>
        <div className="songinfo-buttons-container">
          {showAddToPlaylist && (
            <OpenModalButton
              className="song-box-action-btn"
              buttonText={
                <div className="icon-container">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="song-box-add-to-playlist-img"
                  />
                  <FontAwesomeIcon
                    icon={faList}
                    className="song-box-add-to-playlist-img"
                  />
                </div>
              }
              modalComponent={<AddSongToPlaylistModal props={{ songId: id }} />}
            />
          )}
          {showRemove && (
            <button
              className="div-buttons"
              onClick={(e) => {
                e.stopPropagation();
                removeSong(e, id);
              }}
              songid={id}
              style={{ cursor: "pointer" }}
              type="button"
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
            </button>
          )}
          {showEditDelete && isOwner && (
            <>
              <button
                className="div-buttons"
                onClick={(e) => EditSongPage(e, id)}
                type="button"
              >
                <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
              </button>
              <OpenModalButton
                className="sdiv-buttons"
                buttonText={
                  <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
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
