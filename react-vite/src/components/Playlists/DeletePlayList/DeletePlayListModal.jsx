import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePlaylistThunk } from "../../../redux/playlists";
import { useModal } from "../../../context/Modal";
import "./DeletePlayListModal.css"

function DeletePlaylistModal({ playlist }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deletePlaylistThunk(playlist.id));
    closeModal();
  };

  return (
    <div className="main-div">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this playlist?</p>
      <div className="delete-playlist-modal">
        <button onClick={handleDelete} className="yes-button">
          Yes (Delete Playlist)
        </button>
        <button onClick={closeModal} className="no-button">
          No (Keep Playlist)
        </button>
      </div>
    </div>
  );
}

export default DeletePlaylistModal;
