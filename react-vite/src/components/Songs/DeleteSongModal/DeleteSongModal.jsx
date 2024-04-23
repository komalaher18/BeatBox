
import { deleteSongThunk } from "../../../redux/songs";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

import { useNavigate } from "react-router-dom";
import "./DeleteSongModal.css";

function DeleteSongModal({ song }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteSongThunk(song.id));
    closeModal();
    navigate("/songs"); 
  };

  return (
    <div className="main-div">
      <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
      <p
        style={{
          padding: "20px",
          paddingBottom: "0px",
          marginTop: 0,
          fontSize: "19px",
        }}
      >
        Are you sure you want to delete this song?{" "}
      </p>
      <div className="delete-song-modal">
        <button
          className="yes-button"
          onClick={handleDelete}

        >
          Yes (Delete Song)
        </button>
        <button className="no-button" onClick={() => closeModal()}>
          No (Keep Song)
        </button>
        <br></br>
      </div>
    </div>
  );
}

export default DeleteSongModal;
